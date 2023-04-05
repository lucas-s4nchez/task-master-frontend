import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ILoginCredentials,
  IProject,
  IRegisterCredentials,
  ITask,
  IUser,
} from "../../interfaces";
import { RootState } from "../store";

const api_url = "http://localhost:3000/api/";

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token =
        (getState() as RootState).auth.token ||
        localStorage.getItem("authToken");
      if (token) {
        headers.set("x-token", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["projects", "project", "tasks"],

  endpoints: (builder) => ({
    login: builder.mutation<IUser, ILoginCredentials>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["projects"],
    }),
    register: builder.mutation<IUser, IRegisterCredentials>({
      query: ({ email, password, username }) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          email,
          password,
          username,
        },
      }),
    }),
    refeshToken: builder.query<IUser, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
    getMyProjects: builder.query<any, void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getProjectsWhereICollaborate: builder.query<any, string>({
      query: (userId) => ({
        url: `projects/projectsWhereIParticipate/${userId}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getProjectById: builder.query<{ ok: boolean; project: IProject }, string>({
      query: (projectId) => ({
        url: `projects/${projectId}`,
        method: "GET",
      }),
      providesTags: ["projects", "project"],
    }),
    getTasks: builder.query<{ ok: boolean; tasks: ITask[] }, string>({
      query: (projectId) => ({
        url: `projects/${projectId}/tasks`,
        method: "GET",
      }),
      providesTags: ["projects", "tasks"],
    }),
    updateTasks: builder.mutation<void, any>({
      query: ({ projectId, id, title, description, assignedTo, status }) => ({
        url: `projects/${projectId}/tasks/${id}`,
        method: "PUT",
        body: { title, description, assignedTo, status },
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefeshTokenQuery,
  useGetMyProjectsQuery,
  useGetProjectsWhereICollaborateQuery,
  useGetProjectByIdQuery,
  useGetTasksQuery,
  useUpdateTasksMutation,
} = authApi;
