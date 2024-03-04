import { PostContainer } from '@/components/shared'
import { useGetAllPost } from '@/lib/react-query/queryAndMutaltion'
import { Loader } from 'lucide-react'

const Home = () => {
    const { data: posts, isPending } = useGetAllPost()
    if (isPending) {
        return (
            <div className='flex items-center justify-between mt-5'>
                <Loader />
            </div>
        )
    }

    return (
        <div className=' items-center justify-center '>
            <PostContainer posts={posts?.documents} />
        </div>
    )
}
export default Home
