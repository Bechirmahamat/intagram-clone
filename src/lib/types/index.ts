export type INewUser = {
    name: string
    username?: string
    email: string
    password: string
}
export type IUser = {
    id: string
    name: string
    username: string
    bio: string
    imageUrl: string
}
export type IContext = {
    user: IUser
    isLoading: boolean
    isAuthenticated: boolean
    setIsAuthenticated: () => boolean
    setIsLoading: () => boolean
}
