import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiReducer } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiReducer.reducerPath]: apiReducer.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiReducer.middleware),
    devTools: true
});

export default store