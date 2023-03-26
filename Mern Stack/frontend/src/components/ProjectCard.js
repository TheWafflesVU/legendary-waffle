import styles from "./projectCard.css"
import TinderCard from 'react-tinder-card'
import { useEffect }from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"

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
            <div>
              <p className="card-title">{project.title}</p>
              <p className="card-body"> Number of Teammates: {project.nums} </p>
              <p className="card-body"> Tags: {" "}
                {project.tags.map(tag => {
                  return <span key={tag} className="card-tag">
                    {"[" + tag + "] "}
                  </span>})}
              </p>
              <p className="card-body">Description: {project.description}</p>
      
            
            </div>
          </TinderCard>
        )}
      </div>
      
        
      )

}

export default ProjectCard