export type INewUser = {
    name: string
    username?: string
    email: string
    password: string
}
export type IUser = {
    id: string
    accountId: string
    name: string
    username: string
    bio: string
    imageUrl: string
    following: []
    followers: []
}
export type IContext = {
    user: IUser
    isLoading: boolean
    isAuthenticated: boolean
    checkIsAuthenticated: () => boolean
    logout: () => boolean
}
export type INewPost = {
    caption: string
    file: File[]
    location: string
    tags: string
    creatorId: string
}
export type IPageParam = { pageParam: string }
