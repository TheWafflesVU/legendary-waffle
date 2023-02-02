import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

const App = () => {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/Login"  element={<Login />} />
                <Route path="/Register"  element={<Register />} />
                <Route path="/dashboard"  element={<Dashboard />} />
            </Routes>
        </BrowserRouter>

    </div>
}

export default App