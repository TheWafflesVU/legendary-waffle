import React, { useState, useEffect } from 'react'
import './MyProfile.css'
import { useNavigate} from 'react-router-dom'
import profileImage from './profile.png'
import dog from './dog.png'
import waffle from './waffle.png'

const Profile = () => {
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
      if (!token) {
        setIsLoading(false)
        setError('User is not authenticated')
        return
      }
      try {
        const response = await fetch('/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setIsLoading(false)
          setError(json.error)
        } else {
          setProfile(json)
          setIsLoading(false)
        }
      } catch (e) {
        setIsLoading(false)
        setError(e.message)
      }
    }    
    getProfile()
  }, [])

  const handleEditProfile = () => {
    navigate('/profile')
  };

  return (
    <div className="myprofile-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <div>
          <div className="myprofile-wrapper">
            <div className="myprofile-left">
              <img src={profileImage} alt="" className="rounded-circle" width="150" height="150" />
              {/* <img src={dog} alt="" className="rounded-circle" width="150" height="150" /> */}
              {/* <img src={waffle} alt="" className="rounded-circle" width="150" height="150" /> */}
              <p className="myprofile-info">{profile.firstName} {profile.lastName}</p>
              <p className="myprofile-info">{profile.roles?.join(", ")}</p>
            </div>
            <div className="myprofile-right">
              <p className="myprofile-info">
                <span className="myprofile-info-label">Full Name:</span>
                <span className="myprofile-info-value">{profile.firstName || ''} {profile.lastName || ''}</span>
              </p>
              <p className="myprofile-info">
                <span className="myprofile-info-label">Email:</span>
                <span className="myprofile-info-value">{profile.email}</span>
              </p>
              <p className="myprofile-info">
                <span className="myprofile-info-label">Year:</span>
                <span className="myprofile-info-value">{profile.year ? profile.year.charAt(0).toUpperCase() + profile.year.slice(1).toLowerCase() : ''}</span>
              </p>
              <p className="myprofile-info">
                <span className="myprofile-info-label">Languages:</span>
                <span className="myprofile-info-value">{profile.languages ? profile.languages.join(", ") : ''}</span>
              </p>
              <p className="myprofile-info">
                <span className="myprofile-info-label">GitHub:</span>
                <span className="myprofile-info-value">{profile.socialInfo}</span>
              </p>
            </div>
          </div>
          <div className="myprofile-edit-button-container">
            <button className='myprofile-edit-button' onClick={handleEditProfile}>Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
