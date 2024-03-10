import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  endpoints: (builder) => ({
    getAllIssues: builder.query({
      query: () => ({
        url: "/issues",
        method: "GET",
      }),
    }),
    saveIssue: builder.mutation({
      query: (args) => ({
        url: "/issues",
        method: "POST",
        body: JSON.stringify({
          title: args.title, // Ensure title is a string
          description: args.description, // Ensure description is a string
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateIssue: builder.mutation({
      query: (args) => ({
        url: `/issues/${args.id}/update`,
        method: "PUT",
        body: JSON.stringify({
          title: args.title, // Ensure title is a string
          description: args.description, // Ensure description is a string
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteIssue: builder.mutation({
      query: (args) => ({
        url: `/issues/${args.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllIssuesQuery,
  useSaveIssueMutation,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
} = issuesApi;
