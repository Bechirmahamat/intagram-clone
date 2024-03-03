import { ID, Models } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from './config'
import { INewUser } from '../types'

export const registerRequest = async (userInfo: INewUser) => {
    try {
        const user = await account.create(
            ID.unique(),
            userInfo.email,
            userInfo.name,
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

export const sessionUser = async ({
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
