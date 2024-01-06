import { configureStore } from "@reduxjs/toolkit/react";
import authenticationReducer from './features/authentication/authenticationSlice';

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem('user', JSON.stringify(store.getState().authentication.authentication));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;