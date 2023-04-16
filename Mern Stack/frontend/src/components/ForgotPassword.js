import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import validator from 'validator'
import './PasswordReset.css'

const ForgotPassword = () => {

    const { email, token } = useParams();

    const history = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await fetch(`/api/user/forgotpassword/${email}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()

        if (data.status === 201) {
            console.log("user valid")
        } else {
            console.log("user invalid")
            history("*")
        }
    }


    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();


        if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (!validator.isStrongPassword(password)) {
            toast.error('Password not strong enough. Password must contain a combination of uppercase letters, lowercase letters, numbers, and symbols.')
        } else {
            const res = await fetch(`/api/user/${email}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json()

            if (data.status === 201) {
                setPassword("")
                setMessage(true)
            } else {
                toast.error("Token Expired",{
                    position: "top-center"
                })
            }
        }
    }

    useEffect(() => {
        userValid()
        setTimeout(() => {
            setData(true)
        }, 2000)
    }, [])

    return (
        <>
            {
                data2 ? (
                    <>
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                    <h1>Enter Your NEW Password</h1>
                                </div>

                                <form>
                                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Successfully Updated </p> : ""}
                                    <div className="form_input">
                                        <label htmlFor="password">New password</label>
                                        <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                                    </div>

                                    <button className='btn' onClick={sendpassword}>Change password</button>
                                </form>
                                <p><NavLink to="/login">Back to Login</NavLink></p>
                                <ToastContainer />
                            </div>
                        </section>
                    </>
                ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                </Box>
            }
        </>
    )
}

export default ForgotPassword