import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticate, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),

  endpoints: (builder) => ({
    getMe: builder.query({
        query: () => `/me`, // Corrected the syntax here
        transformResponse: (result) => result.user,
        async onQueryStarted(args,{dispatch,queryFulfilled}) {
            try {

                const { data} =await queryFulfilled;
                dispatch (setUser(data));
                dispatch (setIsAuthenticate(true));

            } catch (error) {

                console.log(error)

            }
        }
    }),
  }),
});

// Corrected the export to use `userApi` instead of `authApi`
export const { useGetMeQuery } = userApi;