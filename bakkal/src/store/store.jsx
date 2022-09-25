import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import basketSlice from "./basketSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    basketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productsApi.middleware),
});

setupListeners(store.dispatch);
