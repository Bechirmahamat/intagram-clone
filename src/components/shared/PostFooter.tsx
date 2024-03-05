import { useUserContext } from '@/GlobalContext'
import {
    useDeleteSave,
    useGetCurrentUser,
    useLikePost,
    useSavePost,
} from '@/lib/react-query/queryAndMutaltion'
import { Models } from 'appwrite'
import { Loader } from '.'
import { useEffect, useState } from 'react'

const PostFooter = ({ post }: { post: Models.Document }) => {
    const { mutateAsync: savePost, isPending: isSavePostLoading } =
        useSavePost()
    const { mutateAsync: deleteSave, isPending: isDeletingLoading } =
        useDeleteSave()
    const { mutateAsync: likedPost } = useLikePost()
    const { data: currentUser } = useGetCurrentUser()
    const { user } = useUserContext()
    const { likes, save } = post
    const likesArray = likes.map((user: Models.Document) => user.$id)
    const savePostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post?.$id
    )

    useEffect(() => {
        setIsSaved(!!savePostRecord)
    }, [currentUser])

    const [isLiked, setIsLiked] = useState<boolean>(
        check({ array: likesArray, id: user.id })
    )
    const [length, setLength] = useState(likes.length)
    const [isSaved, setIsSaved] = useState(false)
    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation()
        let newLikes
        if (isLiked) {
            newLikes = likesArray.filter((like: string) => like !== user.id)
            setIsLiked(false)
        } else {
            newLikes = [...likesArray, user.id]
            setIsLiked(true)
        }
        setLength(newLikes.length)

        likedPost({ postId: post.$id, likesArray: newLikes })
    }
    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isSaved) {
            setIsSaved(false)
            deleteSave(savePostRecord.$id)
        } else {
            setIsSaved(true)
            savePost({ postId: post.$id, userId: user.id })
        }
    }
    return (
        <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
                <button onClick={handleLike}>
                    <img
                        src={
                            isLiked
                                ? '/assets/icons/liked.svg'
                                : '/assets/icons/like.svg'
                        }
                        width={24}
                        height={24}
                        alt='like'
                    />
                </button>
                <span>{length}</span>
            </div>
            <div className='flex items-center '>
                <button
                    onClick={handleSave}
                    disabled={isDeletingLoading || isSavePostLoading}
                >
                    {isDeletingLoading || isSavePostLoading ? (
                        <Loader />
                    ) : (
                        <img
                            src={
                                isSaved
                                    ? '/assets/icons/saved.svg'
                                    : '/assets/icons/save.svg'
                            }
                            width={24}
                            height={24}
                            alt='like'
                        />
                    )}
                </button>
            </div>
        </div>
    )
}
export default PostFooter

const check = ({ array, id }: { array: string[]; id: string }) => {
    return array.includes(id)
}
