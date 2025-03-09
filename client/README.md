
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
│   ├── axiosInstance.ts
│   └── ...
├── api/               # API requests (for handling laptop, user, allocation data)
│   ├── laptopApi.ts
│   ├── userApi.ts
│   └── ...
├── store/             # Redux store and slices
│   ├── features/
│   │   ├── userSlice.ts
│   │   ├── laptopSlice.ts
│   │   ├── allocationSlice.ts
│   │   └── ...
│   ├── hooks/         # Custom hooks (useAppSelector, useAppDispatch)
│   ├── store.ts       # Root Redux store configuration
│   └── ...
├── hooks/             # Custom hooks
│   ├── useDebounce.ts
│   └── ...
└── App.tsx            # Main App component
```

## Installation

To get started with the CMS Client, follow these steps to install the necessary dependencies.

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/cms-client.git
cd cms-client
```

2. **Install dependencies**:

```bash
npm install
```

3. **Install TypeScript and SWC dependencies**:

```bash
npm install --save-dev typescript @swc/core @swc/cli
```

## Run the Development Server

To start the development server, use the following command:

```bash
npm start
```

This will run the app in development mode and open it in your default browser. The page will automatically reload when you make edits.

## API Integration

This project communicates with a backend API to fetch and manage laptops, users, and allocations. The `axiosInstance.ts` file in the `lib` folder is set up to handle API requests.

Example of the API call to get laptops:

```ts
const getLaptops = async () => {
  const response = await axiosInstance.get('/laptop');
  return response.data;
};
```

## Redux Store

The state is managed using **Redux Toolkit**, and the store is configured in the `store.ts` file. The store contains several slices for handling entities like users, laptops, and allocations.

Each slice is located in the `features/` folder under the `store/` directory. Here is an example of the **laptopSlice**:

```ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLaptop = createAsyncThunk("laptop/getLaptop", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/laptop");
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to fetch laptops");
  }
});

const laptopSlice = createSlice({
  name: "laptop",
  initialState: { laptops: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLaptop.fulfilled, (state, action) => {
      state.laptops = action.payload;
      state.status = 'succeeded';
    });
  },
});

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

