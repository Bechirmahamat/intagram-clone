import { Models } from 'appwrite'

const PostHeader = ({ post }: { post: Models.Document }) => {
    return (
        <div className='flex items-center  justify-between gap-2'>
            <div className='flex gap-2 items-center'>
                <img
                    src={post.creator.imageUrl}
                    alt='image'
                    className='h-12 w-12 rounded-full'
                />
                <div className='flex flex-col'>
                    <p className='text-lg '>{post.creator.name}</p>
                </div>
            </div>
        </div>
    )
}
export default PostHeader
