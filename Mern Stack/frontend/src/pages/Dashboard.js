// import React, { useEffect, useState } from "react"
// // import jwt  from "jwt-decode"
// import { useNavigate } from 'react-router-dom'

import logo from '../logo.svg'
import Sidebar from '../components/Sidebar'
import './Dashboard.css'


const Dashboard = () => {

        return (
                <div>
                    <Sidebar />
                
                </div>
                  
        )
    
        
    // const history = useNavigate()
    // const [quote, setQuote] = useState('')

    // async function populateQuote(){

    //     const req = await fetch ('http://localhost:1337/api/quote', {
    //         headers: {
    //             'x-access-token': localStorage.getItem('token')
    //         },
    //     })

    //     const data = req.json()
    //     if (data.status === 'ok'){
    //         setQuote(data.quote)
    //     } else {
    //         alert(data.error)
    //     }
    // }


    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token){
    //         const user = jwt.decode(token)
    //         if (!user){
    //             localStorage.removeItem('token')
    //             history.replace('/login')
    //         } else {
    //             populateQuote()
    //         }
    //     }
    // }, [])

    // return <h1> Your Quote: {quote || 'No quote found'}</h1>

}

export default Dashboard