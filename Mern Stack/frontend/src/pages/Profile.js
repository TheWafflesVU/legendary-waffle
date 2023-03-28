import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

const Profile = () => {
 
  const { user } = useAuthContext()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [year, setYear] = useState('')
  const [languages, setLanguages] = useState('')
  const [roles, setRoles] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const profile = {firstname, lastname, phone, year, languages, roles};
    console.log(profile);
  }

  return (
    <form className="profile" onSubmit={handleSubmit}>

        <div className="profile-image">
          < img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
        </div>

        <div className="profile-header">
            <h3>Profile Settings</h3>
          </div>
        
        <div className="profile-content">

          <div className="first-name">
            <label className="labels">First Name</label>
            <input 
            type="text" 
            className="form-control" 
            placeholder="first name" 
            onChange={(e) => setFirstname(e.target.value)}
            required/>
          </div>

          <div className="last-name">
            <label className="labels">Last Name</label>
          <input 
          type="text" 
          className="form-control" 
          placeholder="last Name" 
          onChange={(e) => setLastname(e.target.value)}
          required/>
          </div>

          <div className="number">
            <label className="labels">Mobile Number</label>
            <input type="text" 
            className="form-control" 
            placeholder="enter phone number" 
            onChange={(e) => setPhone(e.target.value)}
            required/>
          </div>

          <div className="year">
            <label className="labels">Year</label>
            <input type="text" 
            className="form-control" 
            placeholder="enter year you are in" 
            onChange={(e) => setYear(e.target.value)}
            required/>
          </div>

          <div className="languages">
            <label className="labels">Proficient programming languages</label>
            <input type="text" 
            className="form-control" 
            placeholder="e.g. C++, python, java" 
            onChange={(e) => setLanguages(e.target.value)}
            required/>
          </div>

          <div className="roles">
            <label className="labels">Roles you have experienced</label>
            <input type="text" 
            className="form-control"  
            placeholder="e.g. backend, frontend, full-stack" 
            onChange={(e) => setRoles(e.target.value)}
            required/>
          </div>

          <div className="profile-actions">
            <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
          </div>

      </div>
</form>
  )
}

export default Profile
