import { useUserContext } from '@/GlobalContext'
import { sidebarLinks } from '@/constants'
import { Link, NavLink } from 'react-router-dom'

const LeftSideBar = () => {
    const { user } = useUserContext()

    return (
        <div className='flex w-full h-screen flex-col gap-4 px-4 py-4'>
            <div>
                <Link to='/'>
                    <img src='/assets/images/logo.svg' alt='logo' width={140} />
                </Link>
            </div>
            <div className='mt-4 flex items-center gap-2'>
                <Link to='/'>
                    <img
                        src={
                            user?.imageUrl ||
                            'assets/icons/profile-placeholder.svg'
                        }
                        alt='user-img'
                        className='rounded-full w-10 h-10'
                    />
                </Link>
                <div className='flex flex-col'>
                    <p className='capitalize'>{user.name}</p>
                    <p className='text-xs text-light-3'>@{user.username}</p>
                </div>
            </div>
            <ul className='flex-1 flex flex-col w-full mt-3'>
                {sidebarLinks.map((link) => {
                    return (
                        <NavLink
                            to={link.route}
                            key={link.route}
                            className='h-12 hover:bg-dark-4 flex items-center px-5 gap-2'
                        >
                            <img
                                src={link.imgURL}
                                alt=''
                                width={20}
                                height={20}
                                className=''
                            />
                            <span className='text-sm'>{link.label}</span>
                        </NavLink>
                    )
                })}
            </ul>

            <div>
                <Link to='/' className='flex gap-1 items-center'>
                    <img
                        src='assets/icons/logout.svg'
                        alt=''
                        className='w-7 h-7'
                    />
                    <span>Logout</span>
                </Link>
            </div>
            {/* <div className='flex justify-between w-full h-full items-center px-8'>
                
                <div className='flex gap-2'>
                  
                </div>
            </div> */}
        </div>
    )
}
export default LeftSideBar
