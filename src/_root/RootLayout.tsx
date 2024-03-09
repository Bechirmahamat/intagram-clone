import { BottomBar, RightSidebar, Topbar } from '@/components/shared'
import LeftSideBar from '@/components/shared/LeftSideBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <section className='h-screen lg:h-auto flex flex-col min-h-screen md:flex-row  justify-between'>
            <div>
                <nav className='flex h-14 bg-dark-2 w-full sticky top-0  md:hidden'>
                    <Topbar />
                </nav>
                <nav className='hidden w-72 h-full bg-dark-2 md:flex'>
                    <LeftSideBar />
                </nav>
            </div>

            <div className='flex-1 '>
                <div className='mx-8  '>
                    <Outlet />
                </div>
            </div>

            <div>
                <footer className='flex sticky h-14 bg-dark-2 w-full bottom-0  md:hidden'>
                    <BottomBar />
                </footer>
            </div>
        </section>
    )
}
export default RootLayout
