import { createSlice,createAsyncThunk,createEntityAdapter,EntityState } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";

//used types
interface AddLaptop {
    serialNo:string,
    brand:string,
    model:string
}

interface Laptop extends AddLaptop {
    _id?:string,
    allocatedTo?:string,
    status:string
}

interface LaptopSlice extends EntityState<Laptop,string>{
    errorMessage:string | null,
    status:'loading'|'idle'|'failed'
}

//add laptop thunk
export const addLaptop = createAsyncThunk('laptop/addLaptop', async(data:AddLaptop, { rejectWithValue }) => {
    try{
        const{ serialNo, model, brand } = data
        if(!model || !brand || !serialNo){
            return rejectWithValue('Invalid fields')
        }
        const response = await axiosInstance.post('/laptop',data)
        return (await response.data.newLaptop) as Laptop
    }catch(error){
        console.error(error)
    }
})

//get laptop thunk
export const getLaptop = createAsyncThunk('/laptop/getLaptop',async() => {
    try{
        const response = await axiosInstance.get('/laptop')
        return (await response.data.allLaptop) as Laptop[]
    }catch(error){
        console.error(error)
    }
})

//update laptop thunk

const laptopAdaptor = createEntityAdapter({
    selectId:(laptop:Laptop) => laptop._id ?? '',
    sortComparer:(a,b) => (b._id ?? '').localeCompare(a._id ?? ''),
})

const initialState:LaptopSlice = laptopAdaptor.getInitialState({
    errorMessage:null,
    status:'idle'
})

const laptopSlice = createSlice({
    name:'latop',
    initialState,
    reducers:{}
})


export default laptopSlice.reducer