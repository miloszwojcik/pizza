import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://recruitment01.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getInitProject: builder.query<any, void>({
      query: () => `init`,
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),
    getProjectById: builder.query({
      query: (id) => `project/${id}`,
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),
  }),
});

export const { useGetProjectByIdQuery, useGetInitProjectQuery } = projectApi;
