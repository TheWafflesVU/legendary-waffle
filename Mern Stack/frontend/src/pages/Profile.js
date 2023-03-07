import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

const ProfileForm = () => {
  // const { dispatch } = useProfileContext()
  const { user } = useAuthContext()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [year, setYear] = useState('')
  const [languages, setLanguages] = useState('')
  const [roles, setRoles] = useState(null)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const profile = {firstname, lastname, phone, year, languages, roles}

    const response = await fetch('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setFirstname('')
      setLastname('')
      setPhone('')
      setYear('')
      setLanguages('')
      setRoles('')
      setError(null)
      setEmptyFields([])
      // dispatch({type: 'UPDATE_PROFILE', payload: json})
    }
  }

  return (
    <form className="profile" onSubmit={handleSubmit}>

        <div class="profile-image">
          < img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
        </div>

        <div class="profile-header">
            <h3>Profile Settings</h3>
          </div>
        
        <div class="profile-content">

          <div class="first-name">
            <label class="labels">First Name</label>
            <input type="text" class="form-control" placeholder="first name" required/>
          </div>

          <div class="last-name">
            <label class="labels">Last Name</label>
          <input type="text" class="form-control" placeholder="last Name" required/>
          </div>

          <div class="number">
            <label class="labels">Mobile Number</label>
            <input type="text" class="form-control" placeholder="enter phone number" required/>
          </div>

          <div class="year">
            <label class="labels">Year</label>
            <input type="text" class="form-control" placeholder="enter year you are in" required/>
          </div>

          <div class="languages">
            <label class="labels">Proficient programming languages</label>
            <input type="text" class="form-control" placeholder="e.g. C++, python, java" required/>
          </div>

          <div class="roles">
            <label class="labels">Roles you have experienced</label>
            <input type="text" class="form-control"  placeholder="e.g. backend, frontend, full-stack" required/>
          </div>

          <div class="profile-actions">
            <button class="btn btn-primary profile-button" type="submit">Save Profile</button>
          </div>

      </div>
</form>
  )
}

export default ProfileForm

// function Profile() {
//   return (
//     <form>
//     <div className='profile'>

//         <div class="profile-image">
//           < img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
//         </div>

//         <div class="profile-header">
//             <h3>Profile Settings</h3>
//           </div>
        
//         <div class="profile-content">

//           <div class="first-name">
//             <label class="labels">First Name</label>
//             <input type="text" class="form-control" placeholder="first name" required/>
//           </div>

//           <div class="last-name">
//             <label class="labels">Last Name</label>
//           <input type="text" class="form-control" placeholder="last Name" required/>
//           </div>

//           <div class="number">
//             <label class="labels">Mobile Number</label>
//             <input type="text" class="form-control" placeholder="enter phone number" required/>
//           </div>

//           <div class="year">
//             <label class="labels">Year</label>
//             <input type="text" class="form-control" placeholder="enter year you are in" required/>
//           </div>

//           <div class="languages">
//             <label class="labels">Proficient programming languages</label>
//             <input type="text" class="form-control" placeholder="e.g. C++, python, java" required/>
//           </div>

//           <div class="roles">
//             <label class="labels">Roles you have experienced</label>
//             <input type="text" class="form-control"  placeholder="e.g. backend, frontend, full-stack" required/>
//           </div>

//           <div class="profile-actions">
//             <button class="btn btn-primary profile-button" type="submit">Save Profile</button>
//           </div>

//       </div>
//   </div>
// </form>
// )
// }

// export default Profile