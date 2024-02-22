import React, {useEffect, useState} from 'react'


const UserSnapshot = ({userId}) => {

    const [userProfile, setUserProfile] = useState()

    useEffect(async () => {
        fetch('/api/user/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUserProfile(data))

    }, [userId]);

    return (
        <div>
            <img src={} alt="profile picture"/>
            <h>{userProfile.firstName + "" + userProfile.lastName}</h>
            <p>{userProfile.year}</p>
            <p>{userProfile.email}</p>
            <hr/>
        </div>
    )
}

export default UserSnapshot