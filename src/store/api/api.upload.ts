import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UploadImage } from "../../types";

import { RootState } from "../store";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.imgur.com/3/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userData?.token;
      if (token) {
        headers.set("Authorization", `Client-ID 389854dad11a60d`);
      }
    },
  }),

  endpoints: (builder) => ({
    uploadImage: builder.mutation<void, any>({
      query: (data) => {
        console.log(data);
        return {
          url: `image`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
