import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import {
    AllUser,
    CreatePost,
    Explore,
    Home,
    PostDetails,
    Saved,
    UpdatePost,
} from './_root/pages'
import Profile from './_root/pages/Profile'
import { AuthLayout, Login, Register } from './_auth/forms'

const App = () => {
    return (
        <Routes>
            {/* private */}
            <Route path='/' element={<RootLayout />}>
                <Route index={true} element={<Home />}></Route>
                <Route path='/profile/:id/*' element={<Profile />}></Route>
                <Route path='/explore' element={<Explore />}></Route>
                <Route path='/saved' element={<Saved />}></Route>
                <Route path='/all-users' element={<AllUser />}></Route>
                <Route path='/create-post' element={<CreatePost />}></Route>
            </Route>
            <Route path='/update-post/:id' element={<UpdatePost />}></Route>
            {/* public */}
            <Route element={<AuthLayout />}>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Route>
        </Routes>
    )
}
export default App
