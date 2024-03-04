import { useUserContext } from '@/GlobalContext'
import { formatDate } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'

const PostHeader = ({ post }: { post: Models.Document }) => {
    const { user } = useUserContext()
    const canEdit = user.id === post.creator.accountId
    return (
        <div className='flex items-center  justify-between gap-2'>
            <div className='flex gap-2 items-center'>
                <img
                    src={post.creator.imageUrl}
                    alt='image'
                    className='h-12 w-12 rounded-full'
                />
                <div className='flex flex-col'>
                    <p className='text-md '>{post.creator.name}</p>
                    <p className='text-xs text-light-3'>
                        <span>{formatDate(post.$createdAt)}</span> -
                        <span> {post.location}</span>
                    </p>
                </div>
            </div>
            {canEdit && (
                <Link to={'/add-post'}>
                    <img
                        src='/assets/icons/edit.svg'
                        alt='edit'
                        className='w-5 h-5'
                    />
                </Link>
            )}
        </div>
    )
}
export default PostHeader
