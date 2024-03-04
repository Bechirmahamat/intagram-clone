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
        <div className='w-full flex justify-center lg:justify-between '>
            <PostContainer posts={posts?.documents} />

            <div className='hidden bg-dark-4 lg:block flex-1 max-w-[250px] right-0'></div>
        </div>
    )
}
export default Home
