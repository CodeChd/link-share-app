import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LINKS_URL, USERS_URL } from "../constants";

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
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/${data}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createLink: builder.mutation({
      query: (data) => ({
        url: LINKS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getLinks: builder.query({
      query: (data) => ({
        url: data,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateLinkMutation,
  useGetLinksQuery,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
} = apiSlice;

export default apiSlice;
