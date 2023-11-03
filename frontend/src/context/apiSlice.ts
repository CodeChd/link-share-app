import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LINKS_URL, PREVIEW_URL, UPLOAD_URL, USERS_URL } from "../constants";

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
      invalidatesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/${data}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    uploadProfileImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    createPreviewProfile: builder.mutation({
      query: (data) => ({
        url: PREVIEW_URL,
        method: "POST",
        body: data,
      }),
    }),
    getUserPublicProfile: builder.query({
      query: (data) => ({
        url: `${PREVIEW_URL}/${data}/profile`,
      }),
    }),
    createLink: builder.mutation({
      query: (data) => ({
        url: LINKS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Link"],
    }),
    getLinks: builder.query({
      query: (data) => ({
        url: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Link"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateLinkMutation,
  useGetLinksQuery,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useUploadProfileImageMutation,
  useCreatePreviewProfileMutation,
  useGetUserPublicProfileQuery,
} = apiSlice;

export default apiSlice;
