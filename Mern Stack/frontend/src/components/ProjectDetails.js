import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProjectDetails = ({ project }) => {
  const { dispatch } = useProjectsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/projects/' + project._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_PROJECT', payload: json})
    }
  }

  return (
    <div className="project-details">
      <h4>{project.title}</h4>
      <p><strong>User Email: </strong>{project.email}</p>
      <p><strong>Description: </strong>{project.description}</p>
      <p><strong>Required members: </strong>{project.nums}</p>
      <p><strong>Tags: </strong>
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
      </p>
      <p>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</p>
      <span1 className="material-symbols-outlined" onClick={handleClick}>delete</span1>
    </div>
  )
}

export default ProjectDetails