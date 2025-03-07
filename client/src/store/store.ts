import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/users/userSlice'

const store = configureStore({
    reducer:{
        user:userReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;