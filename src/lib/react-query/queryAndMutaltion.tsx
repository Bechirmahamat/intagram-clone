import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import {
    createPost,
    deleteSave,
    followAUser,
    getAllPost,
    getAllUsers,
    getInfiniteExplore,
    getLoggedUserInfo,
    getTopUser,
    getUserById,
    likePost,
    loginRequest,
    registerRequest,
    savePost,
} from '../appwrite/api'

import { INewPost, INewUser } from '../types'
import { toast } from 'react-toastify'
import { QUERY_KEYS } from './queryKeys'
import { Models } from 'appwrite'
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
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_POSTS],
        queryFn: getAllPost,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length > 0) {
                const lastId = lastPage[lastPage.length - 1].$id
                return lastId || ''
            } else {
                return undefined
            }
        },
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

//create a new post
export const useCreatePost = () => {
    const queryCLient = useQueryClient()
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: (data) => {
            queryCLient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            })
        },
    })
}

export const useGetInfiniteExplore = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_EXPLORE],
        queryFn: getInfiniteExplore,
        getNextPageParam: (lastPage, AllPage) => {
            console.log({ lastPage, AllPage })
            if (lastPage?.length > 0) {
                const nextPage = lastPage[lastPage?.length - 1].$id || undefined
                return nextPage
            } else {
                return undefined
            }
        },
    })
}

// get top post

export const useGetTopCreators = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TOP_CREATORS],
        queryFn: getTopUser,
    })
}

// get all user

export const useGetAllUser = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        queryFn: getAllUsers,
        initialPageParam: '',
        getNextPageParam: (lastPage: Models.Document[]) => {
            if (lastPage.length > 0) {
                const lastId = lastPage[lastPage.length - 1].$id
                return lastId || ''
            } else {
                return undefined
            }
        },
    })
}

export const UseGetUserById = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    })
}

export const useFollowAUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            followingId,
            userId,
        }: {
            followingId: string
            userId: string
        }) => followAUser(followingId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_USERS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID],
            })
        },
    })
}

export const useGetPostsByUserId = (creatorId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POSTS_USER_BY_ID],
        queryFn: () => getPostsByUserId(creatorId),
    })
}
