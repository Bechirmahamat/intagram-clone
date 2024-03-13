import { useUserContext } from '@/GlobalContext'
import { Loading } from '@/components/shared'
import { Button } from '@/components/ui/button'
import {
    UseGetUserById,
    useFollowAUser,
} from '@/lib/react-query/queryAndMutaltion'
import { Link, useParams } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams()

    const { data, error, isError, isPending } = UseGetUserById(id || '')

    const { user } = useUserContext()
    const { mutateAsync: followSetup } = useFollowAUser()
    // console.log(user)
    const handleFollow = () => {
        const follow = followSetup({
            followingId: id ? id : '',
            userId: user.id,
        })
    }
    if (isPending) {
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
        <div className='flex flex-col w-full gap-4 mb-4 mt-10'>
            {/* profile header */}
            <div className='flex gap-4 lg:gap-6'>
                {/* profile image */}
                <div>
                    <img
                        src={
                            data?.imageUrl ||
                            '/assets/icons/profile-placeholder.svg'
                        }
                        alt='profile'
                        className='w-16 h-16 lg:w-28 lg:h-28 rounded-full object-cover'
                    />
                </div>

                <div className=''>
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
                                    <button
                                        className='btns bg-primary-600'
                                        onClick={handleFollow}
                                    >
                                        Follow
                                    </button>
                                    <button className='btns text-dark-2 bg-light-2'>
                                        Message
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* followers and folowing */}
                    <div className='flex justify-between my-4'>
                        <p className='flex flex-wrap'>
                            <span className='text-sm text-light-3'>
                                {data?.followers.length}
                            </span>
                            <span className='text-sm text-light-3'>
                                followers
                            </span>
                        </p>
                    </div>
                    {/* bio */}
                    <div className='my-6'>
                        <p>For developers,By Developers </p>
                        <p className='text-sm'> ()web Development</p>
                        <p className='text-sm'> software engineer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile
