import GridPostContainer from '@/components/shared/GridPostContainer'
import { Button } from '@/components/ui/button'
import { useGetInfiniteExplore } from '@/lib/react-query/queryAndMutaltion'

const Explore = () => {
    const {
        data,
        error,
        isError,
        fetchNextPage,
        isPending,
        hasNextPage,
        isFetchingNextPage,
    } = useGetInfiniteExplore()
    if (isPending) return <p>Loading...</p>
    console.log(data)

    return (
        <div>
            <p>Explore</p>
            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data?.pages.map((posts, index) => {
                    return <GridPostContainer key={index} posts={posts} />
                })}
            </div>
            <Button className='bg-red' onClick={() => fetchNextPage()}>
                click
            </Button>
        </div>
    )
}
export default Explore
