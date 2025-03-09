
# CMS Client - ReactJS with TypeScript, Redux Toolkit, and More

Welcome to the **CMS Client**! This project is a Content Management System (CMS) client built with **ReactJS**, **TypeScript**, and several modern tools and libraries. The app allows users to manage laptops, allocations, and users effectively.

## Table of Contents

- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Run the Development Server](#run-the-development-server)
- [API Integration](#api-integration)
- [Redux Store](#redux-store)
- [Components](#components)
- [Custom Hooks](#custom-hooks)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **ReactJS**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for better type safety.
- **SWC (TypeScript-SWC)**: A fast TypeScript and JavaScript compiler.
- **ShadCN UI**: A utility-first CSS framework for UI components.
- **Lucide-React**: A set of customizable icons for React applications.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Redux Toolkit**: A powerful toolset for managing application state with Redux.

## Folder Structure

The folder structure is organized as follows:

```
src/
├── components/        # UI Components (Buttons, Inputs, Cards, etc.)
│   ├── LaptopCard.tsx
│   ├── LaptopStats.tsx
│   ├── ErrorBoundary.tsx
│   └── ...
├── lib/               # Utility functions, helpers, constants
│   ├── utild.ts
│   └── ...
├── api/               # API requests (for handling laptop, user, allocation data)
│   ├── axiosInstance.ts
│   └── ...
├── store/             # Redux store and slices
│   ├── features/
│   │   ├── userSlice.ts
│   │   ├── laptopSlice.ts
│   │   ├── allocationSlice.ts
│   │   └── ...
|   |── store.ts   # the store provider
│   ├── hooks/         # Custom hooks (useAppSelector, useAppDispatch)
│   ├── store.ts       # Root Redux store configuration
│   └── ...
├── hooks/             # Custom hooks
│   ├── useAuthRedirect.ts
│   └── ...
└── App.tsx            # Main App component
```

## Installation

To get started with the CMS Client, follow these steps to install the necessary dependencies.

1. **Clone the repository**:

```bash
git clone https://github.com/walonCode/cms_for_laptop.git
cd cms_for_laptop/client
```

2. **Install dependencies**:

```bash
npm install
```

## Run the Development Server

To start the development server, use the following command:

```bash
npm run dev
```

This will run the app in development mode and open it in your default browser. The page will automatically reload when you make edits.

## API Integration

This project communicates with a backend API to fetch and manage laptops, users, and allocations. The `axiosInstance.ts` file in the `lib` folder is set up to handle API requests.

Example of the API call to get laptops:

```ts
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
```

## Redux Store

The state is managed using **Redux Toolkit**, and the store is configured in the `store.ts` file. The store contains several slices for handling entities like users, laptops, and allocations.

Each slice is located in the `features/` folder under the `store/` directory. Here is an example of the **laptopSlice**:

```ts
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

```

## Components

The `components/` folder contains UI components such as:

- `LaptopCard`: Displays information about a single laptop.
- `LaptopStats`: Displays statistics related to laptops (e.g., total, available, assigned).
- `ErrorBoundary`: Catches errors in the component tree and displays a fallback UI.

These components are designed to be reusable and customizable, making it easy to build out the UI.

## Custom Hooks

The project includes a set of custom hooks for accessing the Redux store and managing state, such as:

- `useAppSelector`: A typed version of `useSelector` for accessing Redux state.
- `useAppDispatch`: A typed version of `useDispatch` for dispatching actions.

Example usage of `useAppSelector`:

```ts
const laptops = useAppSelector((state) => state.laptop.laptops);
```

## Contributing

Contributions are welcome! If you find any bugs or want to improve the app, feel free to submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](../license.txt) file for details.
```

