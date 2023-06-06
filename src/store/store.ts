import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../components/ProjectSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { projectApi } from "./services/projectApi";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
