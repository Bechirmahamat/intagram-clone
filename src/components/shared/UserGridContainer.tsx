import { Models } from 'appwrite'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const UserGridContainer = ({ posts }: { posts: Models.Document[] }) => {
    return (
        <>
            {posts.map((user: Models.Document) => {
                return (
                    <Link
                        to={`/profile/${user.$id}`}
                        key={user.$id}
                        className='border-dark-4 border rounded-xl flex flex-col items-center justify-center p-4'
                    >
                        <img
                            src={user.imageUrl}
                            alt=''
                            className='h-14 w-14 rounded-full'
                        />
                        <p className='text-sm my-1'>{user.name}</p>
                        <p className='text-light-3 mb-2 text-sm'>
                            followed by bechir
                        </p>

                        <Button className='bg-blue-800'>Follow</Button>
                    </Link>
                )
            })}
        </>
    )
}
export default UserGridContainer
