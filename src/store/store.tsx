import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./api/apiSlice";
import authSlice from "./auth/authSlice";
import uiSlice from "./ui/uiSlice";
import tasksSlice from "./tasks/tasksSlice";
import projectsSlice from "./projects/projectsSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    tasks: tasksSlice,
    projects: projectsSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
