import { useEffect }from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ProjectDetails from '../components/ProjectDetails'
import ProjectForm from '../components/ProjectForm'

const Home = () => {
  const {projects, dispatch} = useProjectsContext()
  const {user} = useAuthContext()

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
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="projects">
        {projects && projects.map((project) => (
          <ProjectDetails key={project._id} project={project} />
        ))}
      </div>
      <ProjectForm />
    </div>
  )
}

export default Home