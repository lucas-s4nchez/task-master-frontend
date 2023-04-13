import {
  ILoginCredentials,
  IRegisterCredentials,
  IUser,
} from "../../../models/data";
import { emptyApi } from "../../../services/api";

const authenticationApi = emptyApi.injectEndpoints({
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
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefeshTokenQuery } =
  authenticationApi;
