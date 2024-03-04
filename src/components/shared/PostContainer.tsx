import { Models } from 'appwrite'
import { PostFooter, PostHeader } from '.'

const PostContainer = ({ posts }) => {
    console.log(posts)

    return (
        <>
            <h3 className=' text-xl mb-4'>Home Seed</h3>
            <ul className='grid w-full  max-w-5xl mx-auto  gap-4 py-4'>
                {posts.map((post: Models.Document) => {
                    return (
                        <li
                            key={post.$id}
                            className='p-4 flex flex-col  bg-dark-3 border-dark-4 border w-full rounded-xl sm:max-w-[400px] gap-4 h-screen'
                        >
                            <PostHeader post={post} />

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

                            <PostFooter />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default PostContainer
