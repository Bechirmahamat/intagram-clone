import { useUserContext } from '@/GlobalContext'
import { Link } from 'react-router-dom'

const Topbar = () => {
    const { user } = useUserContext()
    const { logout } = useUserContext()

    return (
        <div className='flex justify-between w-full h-full items-center px-8'>
            <Link to='/'>
                <img src='/assets/images/logo.svg' alt='logo' width={120} />
            </Link>
            <div className='flex gap-2'>
                <button onClick={logout}>
                    <img
                        src='assets/icons/logout.svg'
                        alt=''
                        className='w-7 h-7'
                    />
                </button>
                <Link to='/'>
                    <img
                        src={
                            user?.imageUrl ||
                            'assets/icons/profile-placeholder.svg'
                        }
                        alt='user-img'
                        className='rounded-full w-7 h-7'
                    />
                </Link>
            </div>
        </div>
    )
}
export default Topbar
