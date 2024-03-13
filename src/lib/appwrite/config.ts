import { Account, Avatars, Client, Databases, Storage } from 'appwrite'
export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    saveCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    followersCollectionId: import.meta.env
        .VITE_APPWRITE_FOLLOWERS_COLLECTION_ID,
    followingsCollectionId: import.meta.env
        .VITE_APPWRITE_FOLLOWINGS_COLLECTION_ID,
}
const client = new Client()
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const databases = new Databases(client)
export const avatars = new Avatars(client)
export const account = new Account(client)
export const storage = new Storage(client)
