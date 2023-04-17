import { useState } from "react"
import { useProfile } from "../hooks/useProfile"
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [phoneNumber, setPhone] = useState('')
  const [year, setYear] = useState('')
  const [languages, setLanguages] = useState([])
  const [roles, setRoles] = useState([])
  const [socialInfo, setSocialInfo] = useState('')
  const { updateProfile, isLoading, error } = useProfile()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const my_profile = { firstName, lastName, phoneNumber, year, languages, roles, socialInfo };
    await updateProfile(my_profile);

    if (isLoading) {
      console.log("Updating profile...")
    }

    if (error) {
      console.error(error)
    }
    
    console.log(my_profile)

    navigate('/myprofile')
  }

  const handleLanguages = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      setLanguages([...languages, value]);
    } else {
      setLanguages(languages.filter((item) => item !== value));
    }
  };

  const handleRoles = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      setRoles([...roles, value]);
    } else {
      setRoles(roles.filter((item) => item !== value));
    }
  };

  return (
    <form className="profile" onSubmit={handleSubmit}>

        <div className="profile-image">
          < img className="rounded-circle" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
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
            <input 
              type="tel" 
              className="form-control" 
              placeholder="enter phone number" 
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => {
                if (!((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'Delete')) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              required
            />
          </div>

          <div className="year">
            <label className="labels">Year</label>
            <select className="form-control" onChange={(e) => setYear(e.target.value)} required>
              <option value="">-- select a year --</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="languages">
            <label className="labels">Proficient programming languages</label>
            <div className="form-control">
              <input type="checkbox" id="c++" name="languages" value="C++" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="c++">C++</label>

              <input type="checkbox" id="python" name="languages" value="Python" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="python">Python</label>

              <input type="checkbox" id="java" name="languages" value="Java" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="java">Java</label>

              <input type="checkbox" id="javascript" name="languages" value="JavaScript" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="javascript">JavaScript</label>

              <input type="checkbox" id="ruby" name="languages" value="Ruby" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="ruby">Ruby</label>

              <input type="checkbox" id="php" name="languages" value="PHP" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="php">PHP</label>

              <input type="checkbox" id="swift" name="languages" value="Swift" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="Swift">Swift</label>

              <input type="checkbox" id="go" name="languages" value="Go" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="Go">Go</label>

              <input type="checkbox" id="html/css" name="languages" value="HTML/CSS" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="HTML/CSS">HTML/CSS</label>

              <input type="checkbox" id="sql" name="languages" value="SQL" onChange={(e) => handleLanguages(e)} />
              <label htmlFor="SQL">SQL</label>
            </div>
          </div>

          <div className="roles">
            <label className="labels">Roles you have experienced</label>
            <div className="form-control">
                <input type="checkbox" id="frontend" name="roles" value="Frontend" onChange={(e) => handleRoles(e)} />
                <label htmlFor="frontend">Frontend Developer</label>

                <input type="checkbox" id="backend" name="roles" value="Backend" onChange={(e) => handleRoles(e)} />
                <label htmlFor="backend">Backend Developer</label>

                <input type="checkbox" id="fullstack" name="roles" value="Fullstack" onChange={(e) => handleRoles(e)} />
                <label htmlFor="fullstack">Fullstack Developer</label>

                <input type="checkbox" id="ui designer" name="roles" value="UI Designer" onChange={(e) => handleRoles(e)} />
                <label htmlFor="UI Designer">UI Designer</label>

                <input type="checkbox" id="web graphic designer" name="roles" value="Web Graphic Designer" onChange={(e) => handleRoles(e)} />
                <label htmlFor="Web Graphic Designer">Web Graphic Designer</label>

                <input type="checkbox" id="web analyst" name="roles" value="Web Analyst" onChange={(e) => handleRoles(e)} />
                <label htmlFor="Web Analyst">Web Analyst</label>

                <input type="checkbox" id="web content writer" name="roles" value="Web Content Writer" onChange={(e) => handleRoles(e)} />
                <label htmlFor="Web Content Writer">Web Content Writer</label>

                <input type="checkbox" id="quality assurance (QA) engineer" name="roles" value="Quality Assurance (QA) Engineer" onChange={(e) => handleRoles(e)} />
                <label htmlFor="Quality Assurance (QA) Engineer">Quality Assurance (QA) Engineer</label>

                <input type="checkbox" id="web project manager" name="roles" value="Web Project Manager" onChange={(e) => handleRoles(e)} />
                <label htmlFor="Web Project Manager">Web Project Manager</label>

              </div>
          </div>

          <div className="social_info">
            <label className="labels">GitHub</label>
            <input 
            type="text" 
            className="form-control" 
            placeholder="social information" 
            onChange={(e) => setSocialInfo(e.target.value)}
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