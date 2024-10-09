import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = `${import.meta.env.VITE_BACKEND_URL}/api`;

const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiReducer = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({})
});