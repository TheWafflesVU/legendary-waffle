import { useState } from "react"
import { NavLink } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading} style={{ marginTop: '10px', marginBottom: '10px' }}>Log in</button>
      <p><NavLink to="/password-reset">Forgot Password?</NavLink></p>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login