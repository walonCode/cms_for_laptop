import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";
import { RootState } from "../../store";

// Types
interface AddAllocation {
    laptop: string;
    user: string;
}

interface Allocation extends AddAllocation {
    _id?: string;
    status: string;
    allocatedAt: Date;
    returnedAt: Date;
}

interface AllocationSlice extends EntityState<Allocation, string> {
    errorMessage: string | null;
    status: "loading" | "idle" | "failed";
}

// Create Allocation Thunk
export const addAllocation = createAsyncThunk("allocation/addAllocation", async ({ laptop, user }: AddAllocation, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/allocation/${laptop}/${user}`);
        return response.data.newAllocation as Allocation;
    } catch (error) {
        console.error(error)
        return rejectWithValue("Failed to add allocation");
    }
});

// Get Allocations Thunk
export const getAllocations = createAsyncThunk("allocation/getAllocations", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/allocation");
        return response.data.allocations as Allocation[];
    } catch (error) {
        console.error(error)
        return rejectWithValue( "Failed to fetch allocations");
    }
});

// Update Allocation Thunk
export const updateAllocation = createAsyncThunk("allocation/updateAllocation", async ({ id, laptopId, userId, value }: { id: string; laptopId: string; userId: string; value: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`/allocation/${id}/${laptopId}/${userId}`, { returnStatus: value });
        return response.data.updateAllocation as Allocation;
    } catch (error) {
        console.error(error)
        return rejectWithValue("Update failed");
    }
});

// Delete Allocation Thunk
export const deleteAllocation = createAsyncThunk("allocation/deleteAllocation", async (_id: string, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/allocation/${_id}`);
        return _id; // Return deleted ID to remove it from state
    } catch (error) {
        console.error(error)
        return rejectWithValue("Delete failed");
    }
});

// Entity Adapter
const allocationAdapter = createEntityAdapter<Allocation, string>({
    selectId: (allocation) => allocation._id ?? "",
    sortComparer: (a, b) => (b._id ?? "").localeCompare(a._id ?? ""),
});

const initialState: AllocationSlice = allocationAdapter.getInitialState({
    errorMessage: null,
    status: "idle",
});

const allocationSlice = createSlice({
    name: "allocation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //add
        .addCase(addAllocation.pending, (state) => {
            state.status = "loading";
            state.errorMessage = null;
        })
        .addCase(addAllocation.fulfilled, (state, action) => {
            state.status = "idle";
            allocationAdapter.addOne(state, action.payload);
        })
        .addCase(addAllocation.rejected, (state, action) => {
            state.status = "failed";
            state.errorMessage = action.payload as string;
        })
        
        //get
        .addCase(getAllocations.pending, (state) => {
            state.status = "loading";
            state.errorMessage = null;
        })
        .addCase(getAllocations.fulfilled, (state, action) => {
            state.status = "idle";
            allocationAdapter.setAll(state, action.payload);
        })
        .addCase(getAllocations.rejected, (state, action) => {
            state.status = "failed";
            state.errorMessage = action.payload as string;
        })

        //update
        .addCase(updateAllocation.pending, (state) => {
            state.status = "loading";
            state.errorMessage = null;
        })
        .addCase(updateAllocation.fulfilled, (state, action) => {
            state.status = "idle";
            allocationAdapter.upsertOne(state, action.payload);
        })
        .addCase(updateAllocation.rejected, (state, action) => {
            state.status = "failed";
            state.errorMessage = action.payload as string;
        })
        
        //delete 
        .addCase(deleteAllocation.pending, (state) => {
            state.status = "loading";
            state.errorMessage = null;
        })
        .addCase(deleteAllocation.fulfilled, (state, action) => {
            state.status = "idle";
            allocationAdapter.removeOne(state, action.payload);
        })
        .addCase(deleteAllocation.rejected, (state, action) => {
            state.status = "failed";
            state.errorMessage = action.payload as string;
        });
    },
});

export const {
    selectAll:getAllAllocation,
    selectById:getAllocationById,
    selectIds:getAllocationId
} = allocationAdapter.getSelectors((state:RootState) => state.allocation)

export default allocationSlice.reducer;
