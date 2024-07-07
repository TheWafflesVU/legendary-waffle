import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../../../hooks/useAuthContext";
import './UserSnapShot.css'

const UserSnapshot = ({userId}) => {

    const [userProfile, setUserProfile] = useState({})
    const [loaded, setLoaded] = useState(false)
    const { user } = useAuthContext();

    useEffect(() => {

        if (user && userId) {
            fetch(`/api/user/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUserProfile(data)
                    setLoaded(true)
                })
        }

    }, [userId])


    if (!loaded) {
        return <div>Loading...</div>;
    }
    return (
        <div className="userSnapshot">
            <p className="userName">{userProfile.firstName + " " + userProfile.lastName}</p>
            <p className="userDetails">{userProfile.year}</p>
            <p className="userDetails">{userProfile.email}</p>
        </div>
    )
}

export default UserSnapshot
