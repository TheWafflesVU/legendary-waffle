import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'


import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import Chatroom from './pages/Chatroom'
import ProjectSearchRes from './pages/projectSearchRes'
import Sidebar from './components/Sidebar.js'
import Search from './components/searchbar.js'
import { useState } from 'react'

function App() {
  const { user } = useAuthContext()
  const [search, setSearch] = useState("");


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Search setSearch={(search) => setSearch(search)} />
        {/* <Sidebar /> */}
        <div className="pages">
          <Routes>
            <Route 
              path="/" element={<Navigate to="/login" />}
            />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/homepage" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/homepage" />} />
            <Route path="/homepage" element={<Homepage/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/chatroom' element={<Chatroom/>} />
            <Route path='/projectSearchRes' element={<ProjectSearchRes/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>


  );
}

export default App;

