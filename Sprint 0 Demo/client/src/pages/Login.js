import { useState } from 'react'
import '../Login.css';


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  
      body: JSON.stringify({
        email,
        password,
      }),
  
    })
  
    const data = await response.json()
    
    if (data.user){
      // localStorage.setItem('token', data.user)
      alert('登录成功')
      window.location.href = '/dashboard'
    } else {
      alert('密码tmd不对')
    }
  }


  return <div className="login">
    <h1>Login</h1>
    <form onSubmit={loginUser}>
      <p>
        <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text" 
        placeholder="Email" 
        />
      </p>

      <p>
        <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text" 
        placeholder="Password"  
        />
      </p>  
      <p className="submit">
        <input type="submit" value="login" />
      </p>
    </form>
  </div>
}

export default App;
