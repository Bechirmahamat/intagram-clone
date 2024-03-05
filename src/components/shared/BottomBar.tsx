import { bottombarLinks } from '@/constants'
import { NavLink } from 'react-router-dom'

const BottomBar = () => {
    return (
        <div className='bottomBar w-full '>
            <ul className='flex justify-between  mx-8 border-l-none py-2'>
                {bottombarLinks.map((link) => {
                    return (
                        <NavLink
                            key={link.route}
                            to={link.route}
                            className='flex flex-col items-center'
                        >
                            <img
                                src={link.imgURL}
                                alt='link-img'
                                className='w-5 h-5'
                            />
                            <span className='text-sm'>{link.label}</span>
                        </NavLink>
                    )
                })}
            </ul>
        </div>
    )
}
export default BottomBar
