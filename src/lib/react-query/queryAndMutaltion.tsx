import { useMutation } from '@tanstack/react-query'
import { registerRequest } from '../appwrite/api'

import { INewUser } from '../types'
import { toast } from 'react-toastify'
export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (user: INewUser) => registerRequest(user),
        onError: (error) => {
            toast.error(error.message)
        },
    })
}
