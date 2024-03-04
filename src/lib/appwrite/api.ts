import { ID, Models, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from './config'
import { INewUser } from '../types'

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

export const getAllPost = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        if (!posts) throw new Error()

        return posts
    } catch (error) {
        console.log(error)
    }
}
