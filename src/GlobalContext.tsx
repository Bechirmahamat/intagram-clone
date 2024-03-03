import React, { createContext, useContext, useState } from 'react'
import { IContext, IUser } from './lib/types'

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
    setIsLoading: () => false as boolean,
}
const AppContext = createContext<IContext>(default_state)

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<IUser>(initial_user)
    const values = {
        user,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        setIsLoading,
    }
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
export default GlobalContext
export const useUserContext = () => useContext(AppContext)
