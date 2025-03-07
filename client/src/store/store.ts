import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/users/userSlice'
import laptopReducer from './features/laptops/laptopSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        laptop:laptopReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;