import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.111:8000/api/v1'
    }),
    endpoints: (builder) =>({

        //create user
        createUser: builder.mutation({
          query: (userData) =>({
            url: '/auth/register/',
            method: "POST", 
            body: userData,
            headers: {
                'Content-Type': 'application/json',
            }
          })
        }),




    })
})



export const {
    useCreateUserMutation,



} = baseApi