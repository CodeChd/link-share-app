import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USERS_URL } from "../constants";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["User", "Link"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = apiSlice;

export default apiSlice;
