import { Loading, PostContainer, TopCreators } from '@/components/shared'
import {
    useGetAllPost,
    useGetTopCreators,
} from '@/lib/react-query/queryAndMutaltion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const Home = () => {
    const { ref, inView } = useInView()
    const { data: topCreators, isPending: isTopUserPending } =
        useGetTopCreators()
    console.log(topCreators)

    const {
        data,
        isPending: isPagePostPending,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useGetAllPost()
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage])

    return (
        <div className='w-full flex justify-center lg:justify-between  '>
            <article className='mx-auto w-full flex-1 overflow-y-scroll  h-screen'>
                {isPagePostPending ? (
                    <div className='w-full h-96 grid place-items-center'>
                        <Loading />
                    </div>
                ) : (
                    <div className='w-full mx-auto'>
                        <h3 className=' text-xl mb-4 mt-4'>Home Seed</h3>
                        {data?.pages.map((posts, index) => {
                            return (
                                <PostContainer
                                    key={index}
                                    posts={posts || []}
                                />
                            )
                        })}

                        {hasNextPage && isFetchingNextPage && <Loading />}
                        <div ref={ref}></div>
                    </div>
                )}
            </article>

            <div className='hidden sticky top-5 lg:block  w-80 right-0 '>
                {isTopUserPending ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        <TopCreators topCreators={topCreators || []} />
                    </>
                )}
            </div>
        </div>
    )
}
export default Home
