import { IUser } from "../../../models/data";
import {
  ILoginCredentials,
  IRegisterCredentials,
} from "../../../models/store/authentication";
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
