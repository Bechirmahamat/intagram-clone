import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
import Profile from './_root/pages/Profile'
import { AuthLayout, Login, Register } from './_auth/forms'

const App = () => {
    return (
        <Routes>
            {/* private */}
            <Route path='/' element={<RootLayout />}>
                <Route index={true} element={<Home />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
            </Route>
            {/* public */}
            <Route element={<AuthLayout />}>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Route>
        </Routes>
    )
}
export default App
