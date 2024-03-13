import { Loading } from '@/components/shared'
import GridPostContainer from '@/components/shared/GridPostContainer'
import MasonryLayout from '@/components/shared/MasonryLayout'
import { useGetInfiniteExplore } from '@/lib/react-query/queryAndMutaltion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Models } from 'appwrite'
type Page = Models.Document
const Explore = () => {
    const [focus, setFocus] = useState<boolean>(false)
    const { ref, inView } = useInView()
    const {
        data,
        error,
        isError,
        fetchNextPage,
        isPending,
        hasNextPage,
        isFetchingNextPage,
    } = useGetInfiniteExplore()
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage])
    if (isPending)
        return (
            <div className=' w-full h-96 grid place-items-center'>
                <Loading />
            </div>
        )

    return (
        <div className='my-4'>
            <div className='my-6'>
                <h2 className='mt-8 mb-4 text-2xl font-semibold'>
                    Search posts
                </h2>
                <div
                    className={
                        focus
                            ? 'w-full  border-light-4 border-[1.2px] bg-dark-4 flex gap-4 items-center rounded-md py-2 px-4'
                            : 'w-full  border-transparent border-[1.2px] bg-dark-4 flex gap-4 items-center rounded-md py-2 px-4'
                    }
                >
                    <img
                        src='/assets/icons/search.svg'
                        alt=''
                        className='h-6 w-6'
                    />
                    <input
                        type='text'
                        className='h-7 flex-1 border-none outline-none bg-transparent '
                        placeholder='Search'
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />
                </div>
                <div className='w-full my-6 flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>Popular Today</h2>
                    <div className='py-[6px] px-3 bg-dark-3 rounded-xl flex gap-2'>
                        <span>All</span>
                        <img src='/assets/icons/filter.svg' alt='' />
                    </div>
                </div>
            </div>
            {/* 
            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'> 
                {data?.pages.map((posts, index) => {
                        return <GridPostContainer key={index} posts={posts || []} />
                    })} 
             </div>
              */}
            <div className='w-full'>
                <MasonryLayout pages={data?.pages} />
            </div>
            {hasNextPage && isFetchingNextPage ? (
                <div className='w-full my-4 grid place-items-center'>
                    <Loading />
                </div>
            ) : (
                <></>
            )}
            <div ref={ref}></div>
        </div>
    )
}
export default Explore
