import { configureStore } from "@reduxjs/toolkit";
import { swapiApi } from "./services/swapiApi";

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
