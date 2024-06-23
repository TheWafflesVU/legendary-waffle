import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../../hooks/useAuthContext";
import './UserSnapShot.css'

const UserSnapshot = ({userId}) => {

    const [userProfile, setUserProfile] = useState({})
    const { user } = useAuthContext();

    useEffect(() => {
        fetch(`/api/user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }
        })
        .then(res => res.json())
        .then(data => setUserProfile(data))

    }, [userId]);


    return (
        <div className="userSnapshot">
            <p className="userName">{userProfile.first_name + " " + userProfile.last_name}</p>
            <p className="userDetails">{userProfile.year}</p>
            <p className="userDetails">{userProfile.email}</p>
        </div>
    )
}

export default UserSnapshot
