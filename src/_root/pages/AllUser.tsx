import { Loading, UserGridContainer } from '@/components/shared'
import { useGetAllUser } from '@/lib/react-query/queryAndMutaltion'

const AllUser = () => {
    const { data, isFetchingNextPage, fetchNextPage, isPending, hasNextPage } =
        useGetAllUser()
    return (
        <div className='my-5'>
            <h3 className='flex  items-center gap-2 text-xl font-semibold'>
                <img
                    src='/assets/icons/people.svg'
                    alt=''
                    className='w-8 h-8 lg:w-10 lg:h-12'
                />
                <span>Users</span>
            </h3>
            {isPending ? (
                <Loading />
            ) : (
                <section className='grid mt-4 grid-cols-2 sm:grid-cols-3 md:grid-col-4 gap-6'>
                    {data?.pages.map((posts, index) => {
                        return <UserGridContainer key={index} posts={posts} />
                    })}
                    {hasNextPage && isFetchingNextPage && <Loading />}
                </section>
            )}
        </div>
    )
}
export default AllUser
