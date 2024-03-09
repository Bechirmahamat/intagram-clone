import { Models } from 'appwrite'
import { PostStat } from '.'

const GridPostContainer = ({ posts }: { posts: [] }) => {
    return posts.map((post: Models.Document) => {
        return (
            <li
                key={post.$id}
                className='w-full h-screen sm:h-[280px] relative'
            >
                <div className='w-full h-full'>
                    <img
                        src={post.imageUrl}
                        alt='post-image'
                        className='w-full object-cover h-full rounded-xl'
                    />
                </div>
                <div className='absolute bottom-0 w-full'>
                    <PostStat post={post} />
                </div>
            </li>
        )
    })
}
export default GridPostContainer
