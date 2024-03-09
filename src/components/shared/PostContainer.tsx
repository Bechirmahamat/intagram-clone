import { Models } from 'appwrite'
import { PostFooter, PostHeader } from '.'

const PostContainer = ({ posts }: { posts: Models.Document[] }) => {
    return (
        <ul className='grid w-full place-items-center  max-w-5xl mx-auto  gap-4 py-4'>
            {posts.map((post: Models.Document) => {
                return (
                    <li
                        key={post.$id}
                        className='p-4 flex flex-col  bg-dark-3 border-dark-4 border w-full rounded-xl sm:max-w-[400px] gap-4 max-h-[500px]'
                    >
                        <PostHeader post={post} />
                        <div className=''>
                            <p className='tex-md'>{post.caption}</p>
                            <p className='flex gap-1 text-sm text-light-3 mt-2'>
                                {post.tags.map(
                                    (tags: string, index: number) => {
                                        return <span key={index}>#{tags}</span>
                                    }
                                )}
                            </p>
                        </div>

                        <div className='w-full max-h-96 overflow-hidden'>
                            <img
                                src={
                                    post.imageUrl ||
                                    '/assets/images/profile.png'
                                }
                                alt='post-image'
                                className='w-full  object-cover max-h-96 h-80'
                            />
                        </div>

                        <PostFooter post={post} />
                    </li>
                )
            })}
        </ul>
    )
}
export default PostContainer
