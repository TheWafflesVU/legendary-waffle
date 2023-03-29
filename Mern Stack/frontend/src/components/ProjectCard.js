import styles from "./projectCard.css"
import TinderCard from 'react-tinder-card'
import { useEffect }from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProjectCard = () => {
  
  let {projects, dispatch} = useProjectsContext()
  const {user} = useAuthContext()
  let projectQueue = []

    // Refresh the queue whenever the user refreshes the page
  
    useEffect(() => {
        const fetchProjects = async () => {
          const response = await fetch('/api/projects', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_PROJECTS', payload: json})
          }
        }
    
        if (user) {
          fetchProjects()
          projectQueue = projects
        }
      }, [user])
    
    
      // When card leaves the screen, print a message and reset the state of queue
      const outOfFrame = (project) => {
        console.log(project.title + ' left the screen!')
        projectQueue = projects.filter(pro => pro._id !== project._id)
        projects = projectQueue
      }


      return (
     
      <div className="card-container">
      {projects && projects.map(project =>
        <TinderCard key={project._id} onCardLeftScreen={() => outOfFrame(project)} className="cards">
          <div className="card-body">
            <h5 className="card-title">{project.title}</h5>
            <div className="d-flex justify-content-between">
              <p className="card-text mb-0">
                <i className="bi bi-people"></i> Teammates: {project.nums}
              </p>
              <div className="tags">
                {project.tags.map(tag => {
                  return <span key={tag} className="card-tag badge bg-primary">
                    {tag}
                  </span>
                })}
              </div>
            </div>
            <hr />
            <p className="card-des">{project.description}</p>
          </div>
        </TinderCard>
      )}
    </div>
    )

}

export default ProjectCard