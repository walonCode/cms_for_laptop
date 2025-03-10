import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";
import Cookies from "js-cookie";
import { RootState } from "../../store";


interface RegisterData {
    fullname: string;
    username: string;
    email: string;
    role: "ADMIN" | "FACILITATOR" ;
    password: string;
}

interface User extends RegisterData {
    _id?: string;
    laptopBorrowed: number;
    laptop: [];
    updatedAt: string;
    createdAt:string;
    __v:number
}



interface LoginData {
    email: string;
    password: string;
}

interface Slice {
    user: User | undefined;
    isAuthenticated: boolean;
    errorMessage: string | null;
}

const initialState: Slice = {
    user: undefined,
    isAuthenticated: !!Cookies.get("accessToken"), // 
    errorMessage: null,
};




// Login Thunk
export const login = createAsyncThunk('user/login', async (data: LoginData, { rejectWithValue }) => {
    try {
        const { email, password } = data;
        if (!email || !password) {
            return rejectWithValue("Email and password are required");
        }
        const response = await axiosInstance.post('/users/login', data);
        Cookies.set("accessToken", response.data.data.accessToken, { expires: 1, secure:true });
        console.log(response.data.data.userResponse)
        return (await response.data.data.userResponse) as User;
    } catch (error) {
       console.error(error)
       return rejectWithValue("Login failed");
    }
});

// Register Thunk
export const register = createAsyncThunk('user/register', async (data: RegisterData, { rejectWithValue }) => {
    try {
        const { password, email, username, fullname, role } = data;
        if (!email || !password || !username || !fullname || !role) {
            return rejectWithValue("All fields are required");
        }
        const response = await axiosInstance.post('/users/register', data);
        return response.data.data.userResponse;
    } catch (error) {
        return rejectWithValue(error|| "Registration failed");
    } 
});

//get user thunk
export const getUser = createAsyncThunk('user/getUser',async(_,{rejectWithValue}) => {
    try{
        const response = await axiosInstance.get('/users/profile')
        return (await response.data) as User
    }catch(error){
        console.log(error)
        return rejectWithValue('getting user profile failed')
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = undefined;
            state.isAuthenticated = false;
            state.errorMessage = null;
            Cookies.remove("accessToken");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.errorMessage = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.errorMessage = action.payload as string;
            })
            .addCase(register.fulfilled, (state, ) => {
                state.errorMessage = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.errorMessage = action.payload as string;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return{
                    ...state,
                    user: action.payload,
                    isAuthenticated: true,
                    errorMessage: null
                }
            })
    }
});

export const userState = (state:RootState) => state.user.user
export const isAuthenticatedState = (state:RootState) => state.user.isAuthenticated

export const { logout } = userSlice.actions;
export default userSlice.reducer;
