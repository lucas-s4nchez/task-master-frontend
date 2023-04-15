import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

const api_url = "http://localhost:3000/api/";

export const emptyApi = createApi({
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
  keepUnusedDataFor: 5,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["projects", "project", "tasks", "invitations", "task"],

  endpoints: (builder) => ({}),
});
