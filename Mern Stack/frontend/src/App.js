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
import Sidebar from './components/Sidebar.js'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route path="/homepage" element={<Homepage/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/chatroom' element={<Chatroom/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;