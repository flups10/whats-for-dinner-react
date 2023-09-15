import { apiSlice } from "./apiSlice.js";
const COMMENTS_URL = '/api/comments'

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENTS_URL}/add-comment`,
                method: 'POST',
                body: data
            })      
        }),
        deleteComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENTS_URL}/delete-comment`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {useAddCommentMutation, useDeleteCommentMutation} = commentApiSlice