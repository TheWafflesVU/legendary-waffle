import { useState } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ProjectForm = () => {
  const { dispatch } = useProjectsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [nums, setNums] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const project = {title, description, nums}

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
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
      setTitle('')
      setDescription('')
      setNums('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_PROJECT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Project</h3>

      <label>Project Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>Required members:</label>
      <input 
        type="number"
        onChange={(e) => setNums(e.target.value)}
        value={nums}
        className={emptyFields.includes('nums') ? 'error' : ''}
      />

      <button>Add Project</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ProjectForm