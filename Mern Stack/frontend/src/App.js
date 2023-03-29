import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
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
  console.log(search)


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

            <Route 
              path='/profile'
              element={user ? <Profile /> : <Navigate to="/login" />} 
            />
            <Route 
              path='/chatroom'
              element={user ? <Chatroom /> : <Navigate to="/" />}
            />

            <Route path='/projectSearchRes' element={<ProjectSearchRes/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>


  );
}

export default App;

