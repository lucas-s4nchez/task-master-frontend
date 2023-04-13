import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { emptyApi } from "../services/api";
import authSlice from "../features/authentication/context/authSlice";
import uiSlice from "../features/ui/context/uiSlice";
import tasksSlice from "../features/projects/context/tasksSlice";
import projectsSlice from "../features/projects/context/projectsSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    tasks: tasksSlice,
    projects: projectsSlice,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApi.middleware),
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
