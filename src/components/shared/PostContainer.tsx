import { Models } from 'appwrite'
import { PostFooter, PostHeader } from '.'

const PostContainer = ({ posts }) => {
    return (
        <div className='mx-auto'>
            <h3 className=' text-xl mb-4'>Home Seed</h3>
            <ul className='grid w-full  max-w-5xl mx-auto  gap-4 py-4'>
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
                                            return (
                                                <span key={index}>#{tags}</span>
                                            )
                                        }
                                    )}
                                </p>
                            </div>

                            <div className='overflow-x-hidden'>
                                <img
                                    src={
                                        post.imageUrl ||
                                        '/assets/images/profile.png'
                                    }
                                    alt='post-image'
                                    className='w-full object-cover h-full'
                                />
                            </div>

                            <PostFooter post={post} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default PostContainer
