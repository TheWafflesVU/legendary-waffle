import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './index.css'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import MyProfile from './pages/MyProfile'
import Chatroom from './pages/Chatroom'
import ProjectSearchRes from './pages/projectSearchRes'
import Sidebar from './components/Sidebar.js'
import Search from './components/searchbar.js'
import { React, useState } from 'react'
import Confirmation from './pages/Confirmation'
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import io from 'socket.io-client'



// const socket = io('https://waffle.onrender.com')

function App() {
  const { user } = useAuthContext()
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
      {user && <Sidebar />}
        <Navbar />
        {user && <Search setSearch={(search) => setSearch(search)} />}
        
        <div className="pages">
          <Routes>
            <Route 
              path="/" element={<Navigate to="/login" />}
            />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/homepage" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/homepage" />} />
            <Route path="/homepage" element={<Homepage/>} />

            <Route path='/profile' element={user ? <Profile /> : <Navigate to="/login" />}/>
            {/*<Route path='/chatroom' element={user ? <Chatroom socket={socket} /> : <Navigate to="/" />}/>*/}
            <Route path="/myprofile" element={<MyProfile/>} />

            <Route path='/projectSearchRes' element={<ProjectSearchRes/>} />
            <Route path='/confirmation/:email/:emailToken' element={<Confirmation />} />
            <Route path="/forgotpassword/:email/:token" element={<ForgotPassword />} />
            <Route path="/password-reset" element={<PasswordReset />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>


  );
}

export default App;

