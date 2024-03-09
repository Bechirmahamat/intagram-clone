import { ID, Models, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases, storage } from './config'
import { INewPost, INewUser, IPageParam } from '../types'

export const registerRequest = async (userInfo: INewUser) => {
    try {
        const user = await account.create(
            ID.unique(),
            userInfo.email,
            userInfo.password,
            userInfo.name
        )
        if (!user) throw Error
        // get userImg avatar
        const imageUrl = avatars.getInitials(user.name)

        //save user to the database
        console.log(user)

        const savedUserInTheDatabase = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                name: user.name,
                username: userInfo.username,
                accountId: user.$id,
                email: user.email,
                imageUrl,
            }
        )

        if (!savedUserInTheDatabase) throw Error
        return savedUserInTheDatabase
    } catch (error) {
        console.log(error)
    }
}

//get authentiated user

export const getAccount = async () => {
    try {
        const authAccount = await account.get()
        return authAccount
    } catch (error) {
        console.log(error)
    }
}
// set user in a session

export const loginRequest = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    try {
        const session = await account.createEmailSession(email, password)
        if (!session) throw Error
        return session
    } catch (error) {
        console.log(error)
    }
}
// getLoggedUserInfo

export const getLoggedUserInfo = async () => {
    try {
        const account = await getAccount()

        if (!account) throw Error
        const getUserInfo = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', account.$id)]
        )

        if (!getUserInfo) throw Error
        return getUserInfo.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

// get all post

export const getAllPost = async ({ pageParam }: { pageParam: string }) => {
    try {
        let posts
        if (!pageParam) {
            posts = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.postCollectionId,
                [Query.orderDesc('$createdAt'), Query.limit(6)]
            )
        } else {
            posts = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.postCollectionId,
                [
                    Query.orderDesc('$createdAt'),
                    Query.limit(6),
                    Query.cursorAfter(pageParam),
                ]
            )
        }

        return posts.documents
    } catch (error) {
        console.log(error)
    }
}

// logout user
export const logoutUser = async () => {
    try {
        const session = await account.deleteSessions()
        if (!session) throw Error
        return session
    } catch (error) {
        console.log(error)
    }
}
// like a post

export const likePost = async (postId: string, likesArray: string[]) => {
    try {
        const like = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray,
            }
        )
        if (!like) throw Error
        return like
    } catch (error) {
        console.log(error)
    }
}
export const savePost = async (postId: string, userId: string) => {
    try {
        const save = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.saveCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        )
        if (!save) throw Error
        return save
    } catch (error) {
        console.log(error)
    }
}
export const deleteSave = async (saveId: string) => {
    try {
        const save = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.saveCollectionId,
            saveId
        )
        if (!save) throw Error
        return save
    } catch (error) {
        console.log(error)
    }
}

//delete an image in storage
export const deleteFile = async (fileId: string) => {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId)
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
    }
}

// create a new post

export const createPost = async (post: INewPost) => {
    try {
        //let upload the image to the server

        const uploadImg = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            post.file[0]
        )
        if (!uploadImg) throw Error

        //let get the preview image link so we can add to the post table

        const getImgLink = await storage.getFilePreview(
            appwriteConfig.storageId,
            uploadImg.$id,
            2000,
            2000,
            'top',
            100
        )
        if (!getImgLink) {
            throw Error
        }
        //let create the post
        //----** convert tags into an array
        const tags = post.tags?.replace(/ /g, '').split(',') || []
        const createPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                caption: post.caption,
                imageId: uploadImg.$id,
                location: post.location,
                tags: tags,
                imageUrl: getImgLink,
                likes: [],
                creator: post.creatorId,
            }
        )
        if (!createPost) {
            deleteFile(uploadImg.$id)
            throw Error
        }
        return createPost
    } catch (error) {
        console.log(error)
    }
}
// get infinite post in explore page

export const getInfiniteExplore = async ({
    pageParam,
}: {
    pageParam: string
}) => {
    let lastId = pageParam || ''
    // console.log(lastId)

    try {
        let posts
        if (!lastId) {
            posts = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.postCollectionId,
                [Query.orderDesc('$updatedAt'), Query.limit(8)]
            )
        } else {
            // console.log('this line')

            posts = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.postCollectionId,
                [
                    Query.orderDesc('$updatedAt'),
                    Query.limit(8),
                    Query.cursorAfter(lastId),
                ]
            )
        }
        if (!posts) throw new Error()
        // console.log(posts)

        return posts.documents
    } catch (error) {
        console.log(error)
        return null
    }
}

// get top user

export const getTopUser = async ($id: string) => {
    try {
        const topUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.notEqual('$id', $id), Query.limit(10)]
        )
        if (!topUser) throw new Error()
        return topUser.documents
    } catch (error) {
        console.log(error)
        return null
    }
}

//get all users

export const getAllUsers = async ({ pageParam }: IPageParam) => {
    let query: any = [Query.orderDesc('$createdAt'), Query.limit(6)]
    if (pageParam) {
        query.push(Query.cursorAfter(pageParam))
    }
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            query
        )
        if (!users) throw new Error()
        return users.documents
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (userId: string) => {
    try {
        const user = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId
        )
        if (!user) throw Error
        return user
    } catch (error) {
        console.log(error)
    }
}
