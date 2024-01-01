import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginUserParams,
  SignUpResponce,
  SignUpResponceOut,
  User,
} from "../../types";
import { RootState } from "../store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userData?.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
    },
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
    updateUserData: builder.mutation<SignUpResponce, User>({
      query: (body) => ({
        url: "user",
        method: "PUT",
        body: {
          user: body,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useUpdateUserDataMutation,
} = authApi;
