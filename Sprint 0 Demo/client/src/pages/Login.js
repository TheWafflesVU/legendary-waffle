import { useState } from 'react'


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


  return <div>
    <h1>Login</h1>
    <form onSubmit={loginUser}>

        <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text" 
        placeholder="Email" 
        />

        <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text" 
        placeholder="Password"  
        />
        
        <input type="submit" value="login" />

    </form>
  </div>
}

export default App;
