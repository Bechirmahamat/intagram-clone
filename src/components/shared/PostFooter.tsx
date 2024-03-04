import { useUserContext } from '@/GlobalContext'
import { Models } from 'appwrite'

const PostFooter = ({ post }: { post: Models.Document }) => {
    const { user } = useUserContext()
    const { likes, save } = post
    const isPostLiked = likes.find(
        (like: Models.Document) => like.accountId === user.id
    )
    const isPostSaved = likes.find(
        (like: Models.Document) => like.accountId === user.id
    )
    console.log(isPostLiked, isPostSaved)
    const handleLike = (e) => {}
    const handleSave = (e) => {}
    return (
        <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
                <button onClick={handleLike}>
                    <img
                        src={
                            isPostLiked
                                ? '/assets/icons/liked.svg'
                                : '/assets/icons/like.svg'
                        }
                        width={24}
                        height={24}
                        alt='like'
                    />
                </button>
                <span>{likes.length}</span>
            </div>
            <div className='flex items-center '>
                <button onClick={handleSave}>
                    <img
                        src={
                            isPostSaved
                                ? '/assets/icons/saved.svg'
                                : '/assets/icons/save.svg'
                        }
                        width={24}
                        height={24}
                        alt='like'
                    />
                </button>
            </div>
        </div>
    )
}
export default PostFooter
