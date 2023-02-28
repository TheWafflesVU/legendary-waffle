import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chatroom from '../../../Mern Stack/frontend/src/pages/Chatroom'
import Sidebar from './components/Sidebar.js'

function App() {
    return (
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/Login"  element={<Login />} />
                <Route path="/Register"  element={<Register />} />
                <Route path="/dashboard"  element={<Dashboard />} />
                <Route path="/home" element={<Home/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/chatroom' element={<Chatroom/>} />
            </Routes>
        </BrowserRouter>

    );
}

export default App