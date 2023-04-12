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
  const [selectedTags, setSelectedTags] = useState(new Set())

  const availableTags = [
      'Python', 
      'C++', 
      'Java', 
      'Machine Learning', 
      'data analysis', 
      'smart devices', 
      'social network', 
      'visualization'
  ]

  const handleTagChange = (tag) => {
    const newSelectedTags = new Set(selectedTags)
    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag)
    } else {
      newSelectedTags.add(tag)
    }
    setSelectedTags(newSelectedTags)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const project = {title, description, tags: Array.from(selectedTags), nums}

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

      <label>Tags:</label>
      <div className="proj-tag-container">
        {availableTags.map((tag) => (
        <div key={tag} className="proj-tag-option">
      <input 
        type="checkbox"
        id={`tag-${tag}`}
        className="proj-tag-checkbox"
        checked={selectedTags.has(tag)}
        onChange={() => handleTagChange(tag)}
      />
      <label htmlFor={`tag-${tag}`} className="proj-tag-label">{tag}</label>
    </div>
      ))}
    </div>

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