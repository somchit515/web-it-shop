import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./api/userApi"; // Ensure this import is correct

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; // Wait for the login mutation to succeed
          dispatch(userApi.endpoints.getMe.initiate()); // Trigger the getMe query after successful login
        } catch (error) {
          console.log(error); // Handle errors
        }
      },
    }),
    logout: builder.mutation({ // Changed to builder.mutation
      query() {
        return {
          url: "/logout",
          method: "POST", // Typically, logout is a POST request
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;