import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.111:8000/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },

    }),
    tagTypes: ["history", "Chat"],

    endpoints: (builder) => ({

        //create user
        createUser: builder.mutation({
            query: (userData) => ({
                url: '/register/',
                method: "POST",
                body: userData,
            })
        }),

        // logging user
        loggedUser: builder.mutation({
            query: (userData) => ({
                url: "/login/",
                method: "POST",
                body: userData
            })
        }),

        //perticular logged user
        perticularUser: builder.query({
            query: () => "/users/profile/"
        }),

        //perticular update user
        updateUserInfo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}/`,
                method: "PATCH",
                body: data
            }),

        }),

        //logout user
        logOutUser: builder.mutation({
            query: (data) => ({
                url: "/logout/",
                method: "POST",
                body: data
            })
        }),

        //forget password
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/password-reset/',
                method: "POST",
                body: { email }
            })
        }),

        // resendOTP
        resendOTP: builder.mutation({
            query: (email) => ({
                url: "/send-otp/",
                method: "POST",
                body: { email }
            })
        }),

        //opt verification
        verifyOTP: builder.mutation({
            query: ({ email, otp }) => ({
                url: "/verify-otp/",
                method: "POST",
                body: { email, otp }
            })
        }),

        //change pass
        changedPassword: builder.mutation({
            query: (data) => ({
                url: '/password-reset/confirm/',
                method: 'POST',
                body: data,
            }),
        }),

        //   help & Support
        helpSupport: builder.mutation({
            query: (data) => ({
                url: '/help&support/',
                method: "POST",
                body: data,

            })
        }),

        //get packages
        getPackages: builder.query({
            query: () => "/packages/"
        }),

        // payment_checkout
        paymentActivation: builder.mutation({
            query: (data) => ({
                url: "/checkout-session/",
                method: "POST",
                body: data
            })
        }),

        //billinginfo
        billingInfo: builder.query({
            query: () => "/subscriptions/"
        }),

        //getting boticon/info
        getBotInfo: builder.query({
            query: () => "/models/",
        }),

        chatCreate: builder.mutation({
            query: (data) => ({
                url: "/chat/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['history']
        }),

        chatContinue: builder.mutation({
            query: ({ chatID, data }) => ({
                url: `/chat/${chatID}/`,
                method: "POST",
                body: data

            })
        }),

        // get chat retrive by id
        // retrivedChat : builder.query({
        //     query: (retrivedID) => `/chat/${retrivedID}`
        // })

        retrivedChat: builder.mutation({
            query: (retrivedID) => ({
                url: `/chat/${retrivedID}/`,
                method: "GET",
            })
        }),

        chatHistory: builder.query({
            query: (result) => "/chat-history/",
            providesTags: ['history']
        }),

        perticularChatDelete: builder.mutation({
            query: (id) => ({
                url: `/chat/${id}/`,
                method: "DELETE", // Fixed typo
            }),
            invalidatesTags: (result, error, id) => [{ type: "ChatHistory", id }], // Invalidate cache
        }),


        deleteAllChats: builder.mutation({
            query: () => ({
                url: "/chats/delete-all/",
                method: "DELETE"
            }),
            invalidatesTags: [{ type: "ChatHistory", id: "LIST" }],
        }),

        //edit chatHistory title
        editChatTitle: builder.mutation({
            query: ({ id, newTitle }) => ({
                url: `/chat/${id}/`,
                method: "PATCH",
                body: { title: newTitle }
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "ChatHistory", id }],
        }),

    })
})



export const {
    useCreateUserMutation,
    useLoggedUserMutation,
    useLogOutUserMutation,
    useForgetPasswordMutation,
    useVerifyOTPMutation,
    useResendOTPMutation,
    useChangedPasswordMutation,
    useUpdateUserInfoMutation,

    usePerticularUserQuery,

    useHelpSupportMutation,

    useGetPackagesQuery,

    usePaymentActivationMutation,

    useBillingInfoQuery,

    useGetBotInfoQuery,
    useChatCreateMutation,
    useChatContinueMutation,
    useRetrivedChatMutation,
    useChatHistoryQuery,
    usePerticularChatDeleteMutation,
    useDeleteAllChatsMutation,
    useEditChatTitleMutation,

} = baseApi