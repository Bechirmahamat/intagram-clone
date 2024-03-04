import { useMutation, useQuery } from '@tanstack/react-query'
import { getAllPost, loginRequest, registerRequest } from '../appwrite/api'

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
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
        queryFn: () => getAllPost(),
    })
}
