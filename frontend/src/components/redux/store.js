import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { productApi } from "./api/productsApi";
import { authApi } from "./authApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    auth : userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware().concat([productApi.middleware, authApi.middleware, userApi.middleware]),
});
