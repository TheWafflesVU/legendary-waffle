import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

function App() {

  // const history = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  
      body: JSON.stringify({
        name,
        email,
        password,
      }),
  
    })

    window.location.href = '/login'
  
  }


  return <div>
    <h1>Register</h1>
    <form onSubmit={registerUser}>

        <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text" 
        placeholder="name" 
        />

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
        
        <input type="submit" value="Register" />

    </form>
  </div>
}

export default App;
