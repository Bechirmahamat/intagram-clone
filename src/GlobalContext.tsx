import React, { createContext, useContext, useEffect, useState } from 'react'
import { IContext, IUser } from './lib/types'
import { toast } from 'react-toastify'
import { getLoggedUserInfo } from './lib/appwrite/api'
import { useNavigate } from 'react-router-dom'

const initial_user = {
    id: '',
    name: '',
    username: '',
    bio: '',
    imageUrl: '',
}
const default_state = {
    user: initial_user,
    isLoading: false,
    isAuthenticated: false,
    setIsAuthenticated: () => false as boolean,
    checkIsAuthenticated: () => false as boolean,
    setIsLoading: () => false as boolean,
}
const AppContext = createContext<IContext>(default_state)

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<IUser>(initial_user)
    const checkIsAuthenticated = async () => {
        try {
            const accountInfo = await getLoggedUserInfo()
            if (!accountInfo) {
                localStorage.removeItem('cookieFallback')
                navigate('/login')
                return false
            }

            if (accountInfo) {
                setUser({
                    id: accountInfo.accountId,
                    name: accountInfo.name,
                    username: accountInfo.username,
                    bio: accountInfo.bio,
                    imageUrl: accountInfo.imageUrl,
                })
                setIsAuthenticated(true)
                return true
            } else {
                return false
            }
        } catch (error) {
            toast.error('something went wrong!.')
            console.log(error)

            return false
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (
            localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null
        ) {
            navigate('/login')
        }
        checkIsAuthenticated()
    }, [])
    const values = {
        user,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkIsAuthenticated,
        setIsLoading,
    }
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
export default GlobalContext
export const useUserContext = () => useContext(AppContext)
