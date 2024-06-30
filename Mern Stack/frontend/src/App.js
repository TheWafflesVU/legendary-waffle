import { React, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './index.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar.js'
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


function App() {
  const { user } = useAuthContext()
  const [refresh, setRefresh] = useState(false)

  return (
    <div className="App">

      <BrowserRouter>

      {user && <Sidebar />}

        <div className="main-content">

          <Navbar />

          {user && window.location.pathname !== '/profile' && <SearchBar setRefresh={setRefresh} refresh={refresh}/>}

          <div className="pages">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/homepage" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/homepage" />} />

              <Route path="/homepage" element={<Homepage/>} />
              <Route path="/profile" element={<UserProfile/>} />
              <Route path='/chatroom' element={user ? <Chatroom /> : <Navigate to="/" />}/>
              <Route path="/search" element={<SearchResult refresh={refresh}/>} />

              <Route path='/confirmation/:email/:emailToken' element={<Confirmation />} />
              <Route path="/forgotpassword/:email/:token" element={<ForgotPassword />} />
              <Route path="/password-reset" element={<PasswordReset />} />

            </Routes>

          </div>

        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;

