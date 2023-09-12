import { apiSlice } from "./apiSlice";
const DINNERS_URL = '/api/dinners'

export const dinnerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDinner: builder.mutation({
            query: (data) => ({
                url: `${DINNERS_URL}/`,
                method: 'POST',
                body: data,
            })
        }),
        getOneDinner: builder.mutation({
            query: (data) => ({
                url: `${DINNERS_URL}/get-one-dinner`,
                method: 'POST',
                body: data
            })
        }),
        addCustomDinner: builder.mutation({
            query: (data) => ({
                url:  `${DINNERS_URL}/add-custom-dinner`,
                method: 'POST',
                body: data
            })
        }),
        updateCustomDinner: builder.mutation({
            query: (data) => ({
                url:  `${DINNERS_URL}/update-custom-dinner`,
                method: 'POST',
                body: data
            })
        }),
        deleteDinner: builder.mutation({
            query: (data) => ({
                url:  `${DINNERS_URL}/delete-custom-dinner`,
                method: 'POST',
                body: data
            })
        }),
    })
}) 

export const {
     useGetAllDinnerMutation,
     useGetOneDinnerMutation, 
     useAddCustomDinnerMutation, 
     useUpdateCustomDinnerMutation,
     useDeleteDinnerMutation
    } = dinnerApiSlice
