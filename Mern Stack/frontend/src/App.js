import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

import Home from './pages/Home'

import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import MyProfile from './pages/MyProfile'
import Chatroom from './pages/Chatroom'
import ProjectSearchRes from './pages/projectSearchRes'
import Sidebar from './components/Sidebar.js'
import Search from './components/searchbar.js'
import { React, useState } from 'react'
import backgroundImage from './background.jpg';
import Confirmation from './pages/Confirmation'
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";

import backgroundImage2 from './background2.jpg';
import io from 'socket.io-client'


const appStyle = {
  // backgroundImage: `url(${backgroundImage})`,
  backgroundImage: `url(${backgroundImage2})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%',
};

const socket = io('http://10.66.200.137:4000')

function App() {
  const { user } = useAuthContext()
  const [search, setSearch] = useState("");


  return (
    <div className="App" style={appStyle}>
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

            <Route 
              path='/profile'
              element={user ? <Profile /> : <Navigate to="/login" />} 
            />
            <Route 
              path='/chatroom'
              element={user ? <Chatroom socket={socket} /> : <Navigate to="/" />}
            />

            <Route path="/myprofile" element={<MyProfile/>} />

            <Route 
              path='/home'
              element={user ? <Home /> : <Navigate to="/" />}
            />

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

