import { useUserContext } from '@/GlobalContext'
import { Loading, PostsTabs } from '@/components/shared'
import { Button } from '@/components/ui/button'
import {
    UseGetUserById,
    useFollowAUser,
} from '@/lib/react-query/queryAndMutaltion'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams()
    const { user, isLoading } = useUserContext()
    const { data, error, isError, isPending } = UseGetUserById(id || '')

    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)
    const isFollowed = !!user?.following.find(
        (account: string) => account === id
    )

    const { mutateAsync: followSetup, isPending: FollowingLoader } =
        useFollowAUser()

    useEffect(() => {
        setFollowers(data?.followers.length)
        setFollowings(data?.followings.length)
    }, [data, FollowingLoader])
    const handleFollow = () => {
        const follow = followSetup({
            followingId: id ? id : '',
            userId: user.id,
        })
    }
    if (isPending && isLoading) {
        return (
            <div className='w-full mt-16'>
                <Loading />
            </div>
        )
    }
    if (isError) {
        return (
            <div className='h-96 mw-full flex justify-center items-center flex-col mx-auto'>
                <h3 className='text'>Oops! something went wrong</h3>
                <Link to={'/'}>
                    <Button className='bg-red my-4'>Go back Home</Button>
                </Link>
            </div>
        )
    }

    return (
        <div
            style={{ width: '100%' }}
            className='flex flex-col  gap-4 mb-4 mt-10 overflow-scroll h-full'
        >
            {/* profile header */}
            <div className='flex  gap-4 lg:gap-6 '>
                {/* profile image */}
                <div className='flex w-16 h-16 lg:w-28 lg:h-28'>
                    <img
                        src={
                            data?.imageUrl ||
                            '/assets/icons/profile-placeholder.svg'
                        }
                        alt='profile'
                        className='w-16 h-16 lg:w-28 lg:h-28 rounded-full object-cover'
                    />
                </div>

                <div className='overflow-hidden flex-1 w-full'>
                    {/* name and buttons */}
                    <div className='flex w-full  gap-6'>
                        <div>
                            <p className='text-2xl font-semibold capitalize'>
                                {data?.name}
                            </p>
                            <p className='text-light-3 mt-1 text-sm'>
                                @{data?.username}
                            </p>
                        </div>
                        <div className=''>
                            {user.id === data?.$id ? (
                                <Link
                                    to={`/edit/${data?.$id}`}
                                    className='flex bg-dark-4 gap-3 rounded-md px-2 py-2'
                                >
                                    <img
                                        src='/assets/icons/edit.svg'
                                        alt='edit'
                                        className='w-6 h-6 object-cover '
                                    />
                                    <span>edit profile</span>
                                </Link>
                            ) : (
                                <div className='flex gap-1 items-center'>
                                    {isFollowed ? (
                                        <button className='btns bg-dark-1 border border-dark-4'>
                                            Followed
                                        </button>
                                    ) : (
                                        <button
                                            className='btns bg-primary-600'
                                            onClick={handleFollow}
                                        >
                                            Follow
                                        </button>
                                    )}
                                    <button className='btns text-dark-2 bg-light-2'>
                                        Message
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* followers and folowing */}
                    <div className='flex gap-4 capitalize   my-4'>
                        <p className='flex gap-2 flex-wrap'>
                            <span className='text-md text-primary-600'>
                                {data?.posts?.length}
                            </span>
                            <span className='text-md text-light-3'>posts</span>
                        </p>
                        <p className='flex gap-2 flex-wrap'>
                            <span className='text-md text-primary-600'>
                                {followers}
                            </span>
                            <span className='text-md text-light-3'>
                                followers
                            </span>
                        </p>
                        <p className='flex gap-2 flex-wrap'>
                            <span className='text-md text-primary-600'>
                                {followings}
                            </span>
                            <span className='text-md text-light-3'>
                                followings
                            </span>
                        </p>
                    </div>
                    {/* bio */}
                    <div className='my-6'>
                        <p>For developers,By Developers </p>
                        <p className='text-sm'> ()web Development</p>
                        <p className='text-sm'> software engineer</p>
                    </div>
                    {/* status */}
                    <div className='my-4 flex gap-4 overflow-x-scroll w-full scrollBar'>
                        <div className='w-16 overflow-hidden p-1 h-16 flex items-center justify-center rounded-full  relative'>
                            <img
                                src='/assets/images/profile.png'
                                alt='status'
                                className='rounded-full  w-full h-full object-cover'
                            />
                            <div className='absolute border-2 border-primary-600 w-full h-full z-12 top-0 left-0 rounded-full'></div>
                        </div>
                    </div>
                </div>
                {/* buttons tabs */}
            </div>
            <div className='w-full'>
                <PostsTabs user={data || {}} />
            </div>
        </div>
    )
}
export default Profile
