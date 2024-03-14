import React, { createContext, useContext, useEffect, useState } from 'react'
import { IContext, IUser } from './lib/types'
import { toast } from 'react-toastify'
import { getLoggedUserInfo } from './lib/appwrite/api'
import { useNavigate } from 'react-router-dom'
import { Models } from 'appwrite'

const initial_user = {
    id: '',
    accountId: '',
    name: '',
    username: '',
    bio: '',
    imageUrl: '',
    following: [],
    followers: [],
}
const default_state = {
    user: initial_user,
    isLoading: false,
    isAuthenticated: false,
    setIsAuthenticated: () => false as boolean,
    checkIsAuthenticated: () => false as boolean,
    logout: () => false as boolean,
}
const AppContext = createContext<IContext>(default_state)

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<IUser>(initial_user)
    useEffect(() => {
        if (
            localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null
        ) {
            navigate('/login')
        }
        checkIsAuthenticated()
    }, [])
    const checkIsAuthenticated = async () => {
        try {
            const accountInfo = await getLoggedUserInfo()
            // console.log(accountInfo)

            if (!accountInfo) {
                localStorage.removeItem('cookieFallback')
                navigate('/login')
                return false
            }

            if (accountInfo) {
                setUser({
                    id: accountInfo.$id,
                    accountId: accountInfo.accountId,
                    name: accountInfo.name,
                    username: accountInfo.username,
                    bio: accountInfo.bio,
                    imageUrl: accountInfo.imageUrl,
                    following: accountInfo.followings.map(
                        (account: Models.Document) => account.userId.$id
                    ),
                    followers: accountInfo.followers.map(
                        (account: Models.Document) => account.followedId.$id
                    ),
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

    const logout = () => {
        toast.success('Login out')
        setTimeout(() => {
            setIsAuthenticated(false)
            localStorage.removeItem('cookieFallback')
            navigate('/login')
        }, 1000)
        return true
    }
    const values = {
        user,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkIsAuthenticated,
        logout,
    }

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
export default GlobalContext
export const useUserContext = () => useContext(AppContext)
