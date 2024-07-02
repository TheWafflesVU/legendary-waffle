import { React, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './index.css'

import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar.js'
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";

import Login from './pages/Login'
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import UserProfile from './pages/UserProfile'
import Chatroom from './pages/Chatroom'
import Confirmation from './pages/Confirmation'
import {SearchResult} from "./pages/SearchResult";
import PostProject from "./pages/PostProject";
import SideNavBar from "./components/SideNavBar";


function App() {
  const { user } = useAuthContext()
  const [refresh, setRefresh] = useState(false)

  return (
    <div className="App">

      <BrowserRouter>

        <div className="main-container">

          <SideNavBar/>

          <div className="content-container">

            <Navbar />

            {user && <SearchBar setRefresh={setRefresh} refresh={refresh}/>}

            <div className="pages">
              <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/homepage" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/homepage" />} />

                <Route path="/homepage" element={<Homepage/>} />
                <Route path="/profile" element={<UserProfile/>} />
                <Route path='/chatroom' element={user ? <Chatroom /> : <Navigate to="/homepage" />}/>
                <Route path="/search" element={<SearchResult refresh={refresh}/>} />
                <Route path="/create" element={<PostProject />} />

                <Route path='/confirmation/:email/:emailToken' element={<Confirmation />} />
                <Route path="/forgotpassword/:email/:token" element={<ForgotPassword />} />
                <Route path="/password-reset" element={<PasswordReset />} />

                <Route path="/" element={<Navigate to="/login" />} />


              </Routes>

            </div>
          </div>

        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;

