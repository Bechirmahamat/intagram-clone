import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    deleteSave,
    getAllPost,
    getLoggedUserInfo,
    likePost,
    loginRequest,
    registerRequest,
    savePost,
} from '../appwrite/api'

import { INewUser } from '../types'
import { toast } from 'react-toastify'
import { QUERY_KEYS } from './queryKeys'
export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (user: INewUser) => registerRequest(user),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })
}
export const useLoginUser = () => {
    return useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string
            password: string
        }) => loginRequest({ email, password }),
        onError: (error) => {
            toast.error(error.message)
        },
    })
}

// get all the products

export const useGetAllPost = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POSTS],
        queryFn: () => getAllPost(),
    })
}
// getCurrentUser=
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getLoggedUserInfo,
    })
}

// like a post

export const useLikePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            postId,
            likesArray,
        }: {
            postId: string
            likesArray: string[]
        }) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
        },
    })
}

// save a post
export const useSavePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
            savePost(postId, userId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        },
    })
}

//delete a save post

export const useDeleteSave = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (saveId: string) => deleteSave(saveId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        },
    })
}
