import Masonry from 'react-masonry-css'

import { Models } from 'appwrite'
import { PostStat } from '.'
type Page = Models.Document
interface Props {
    pages?: Page[]
}

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
}
const MasonryLayout = ({ pages }: Props) => {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className='flex space-x-4 space-y-4 bg-dark-4 p-4  w-auto flex-1'
            columnClassName=''
        >
            {pages?.map((posts) => {
                return posts.map((post: Models.Document) => {
                    return (
                        <li key={post.$id} className='relative mb-4'>
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
            })}
        </Masonry>
    )
}
export default MasonryLayout
