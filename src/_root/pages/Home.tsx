import { Loading, PostContainer } from '@/components/shared'
import { useGetAllPost } from '@/lib/react-query/queryAndMutaltion'

const Home = () => {
    const { data: posts, isLoading } = useGetAllPost()

    if (isLoading) {
        return (
            <div className='w-full h-96 grid place-items-center'>
                <Loading />
            </div>
        )
    }

    return (
        <div className='w-full flex justify-center lg:justify-between '>
            <PostContainer posts={posts?.documents} />

            <div className='hidden bg-dark-2 lg:block flex-1 max-w-[250px] xl:max-w-[270px] right-0'></div>
        </div>
    )
}
export default Home
