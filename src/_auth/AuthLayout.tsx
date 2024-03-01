import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <section className='flex justify-between h-full'>
            <div className='flex-1 flexx '>
                <Outlet />
            </div>
            <img
                src='/assets/images/side-img.svg'
                alt='sideImg'
                width={500}
                className='hidden lg:flex left-0 object-cover'
            />
        </section>
    )
}
export default AuthLayout
