import { createSlice, createAsyncThunk,EntityState,createEntityAdapter } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";
import { RootState } from "../../store";

// Types
interface AddLaptop {
    serialNo: string;
    brand: string;
    model: string;
}

interface Laptop extends AddLaptop {
    _id: string;
    allocatedTo: string | undefined;
    status: 'AVAILABLE' | 'ASSIGNED' | 'FAULTY' | 'RETURNED';
    createdAt:string;
    updatedAt:string,
    __v : number

}

const laptopAdaptor = createEntityAdapter<Laptop, string>({
    selectId :(laptop) => laptop._id,
    sortComparer: (a,b) => (b._id ?? "").localeCompare(a._id ?? ""),
});

interface LaptopSlice extends EntityState<Laptop, string> {
    errorMessage: string | null;
    status: "loading" | "idle" | "failed" | "succeeded";
}

// Add Laptop Thunk
export const addLaptop = createAsyncThunk("laptop/addLaptop", async (data: AddLaptop, { rejectWithValue }) => {
    try {
        const { serialNo, model, brand } = data;
        if (!model || !brand || !serialNo) {
            return rejectWithValue("Invalid fields");
        }
        const response = await axiosInstance.post("/laptop", data);
        return (await response.data) as Laptop;

    } catch (error) {
        console.error(error)
        return rejectWithValue("Failed to add laptop");
    }
});

// Get Laptops Thunk
export const getLaptop = createAsyncThunk("laptop/getLaptop", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/laptop");
        console.log(response.data)
        return (await response.data.data) as Laptop[];
    } catch (error) {
        console.error(error)
        return rejectWithValue("Failed to fetch laptops");
    }
});

// Update Laptop Thunk
export const updateLaptop = createAsyncThunk("laptop/updateLaptop", async (data: Laptop, { rejectWithValue }) => {
    try {
        const { _id, brand, model, serialNo, status } = data;
        if (!_id) return rejectWithValue("Laptop ID is required");

        const response = await axiosInstance.patch(`/laptop/${_id}`, { brand, model, serialNo, status });
        return (await response.data) as Laptop;
    } catch (error) {
        console.error(error)
        return rejectWithValue("Update failed");
    }
});

// Delete Laptop Thunk
export const deleteLaptop = createAsyncThunk("laptop/deleteLaptop", async (_id: string | undefined, { rejectWithValue }) => {
    try {
        if (!_id) return rejectWithValue("Laptop ID is required");
        await axiosInstance.delete(`/laptop/${_id}`);
        return _id; 
    } catch (error) {
        console.error(error)
        return rejectWithValue("Deleting failed");
    }
});



const initialState: LaptopSlice = laptopAdaptor.getInitialState ({
    errorMessage: null,
    status: "idle",
});

const laptopSlice = createSlice({
    name: "laptop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle Adding Laptop
            .addCase(addLaptop.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
            })
            .addCase(addLaptop.fulfilled, (state, action) => {
                state.status = "succeeded";
                laptopAdaptor.addOne(state, action.payload);
            })
            .addCase(addLaptop.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.payload as string;
            })

            // Handle Fetching Laptops
            .addCase(getLaptop.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
            })
            .addCase(getLaptop.fulfilled, (state, action) => {
                state.status = "succeeded";
                laptopAdaptor.upsertMany(state, action.payload);          })
            .addCase(getLaptop.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.payload as string;
            })

            // Handle Updating Laptop
            .addCase(updateLaptop.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
            })
            .addCase(updateLaptop.fulfilled, (state, action) => {
                state.status = "succeeded";
                laptopAdaptor.upsertOne(state, action.payload);
            })
            .addCase(updateLaptop.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.payload as string;
            })

            // Handle Deleting Laptop
            .addCase(deleteLaptop.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
            })
            .addCase(deleteLaptop.fulfilled, (state, action) => {
                state.status = "idle";
                laptopAdaptor.removeOne(state, action.payload);
            })
            .addCase(deleteLaptop.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.payload as string;
            });
    },
});

//
export const {
    selectAll: getAllLaptop,
    selectById: getLaptopById,
    selectIds: getLaptopId
} = laptopAdaptor.getSelectors((state:RootState) => state.laptop);

export default laptopSlice.reducer;
