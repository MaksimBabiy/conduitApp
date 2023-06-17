import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginUserParams,
  SignUpResponce,
  SignUpResponceOut,
} from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api/",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponce, SignUpResponceOut["user"]>({
      query: (args) => ({
        url: "users",
        method: "POST",
        body: {
          user: args,
        },
      }),
    }),
    signIn: builder.mutation<SignUpResponce, LoginUserParams>({
      query: (args) => ({
        url: "users/login",
        method: "POST",
        body: {
          user: args,
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
