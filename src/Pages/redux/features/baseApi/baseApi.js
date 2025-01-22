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
            url: '/register/',
            method: "POST", 
            body: userData,
          })
        }),


        //logging user
        loggedUser : builder.mutation({
            query: (userData)=>({
                url: "/login/",
                method: "POST",
                body: userData
            })
        }),

        //forget password
        forgetPassword : builder.mutation({
            query: (email) =>({
                url: '/password-reset/',
                method: "POST",
                body: {email}
            })
        })






    })
})



export const {
    useCreateUserMutation,
    useLoggedUserMutation,
    useForgetPasswordMutation,
} = baseApi