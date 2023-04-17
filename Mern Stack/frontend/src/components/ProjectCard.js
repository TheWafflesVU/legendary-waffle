import React from 'react'
import TinderCard from 'react-tinder-card'
import { useEffect, useState, useRef }from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useNavigate } from 'react-router-dom'

const ProjectCard = () => {

  // Authentication & Projects
  const {projects, dispatch} = useProjectsContext()
  const {user} = useAuthContext()

  // Store query from database
  const resultQueue = useRef([])

  // Store reference & value of index to the last element of current queue
  const lastRef = useRef(0)
  const [last, setlast] = useState(0)

  // Store reference to the TinderCard compoenents
  const proRef = useRef([])

  // Helpers for re-rendering & refetching
  const [cardContainerKey, setCardContainerKey] = useState(0);
  const [refresh, setRefresh] = useState(true)

  const navigate = useNavigate()

  // Refresh the queue on refreshing the page
  useEffect(() =>  {

    // Fetch all projects
    const fetchProjects = async () => {
      const response = await fetch('/api/projects/all', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PROJECTS', payload: json})
      }
    }

    if (user) {
      console.log("fetching all projects")
        fetchProjects()
      }
  }, [user, refresh])


  // Set the queues
  useEffect(() => {
    if (Array.isArray(projects)){
      console.log("updating queues")
      resultQueue.current = [...projects]
      lastRef.current = projects.length - 1 
      setlast(lastRef.current)
      proRef.current = Array(projects.length).fill(0).map((i) => React.createRef())
    }
  }, [projects])


  // Update current index
  const updateIndex = (val) => {
    lastRef.current = val
    setlast(val)
  }

  // When card leaves the screen
  const outOfFrame = (title, index) => {
    console.log(title)
    lastRef.current >= index && proRef.current[index].current.restoreCard()
  }
  
  // Regret button
  const goBack = async () => {
    console.log(last);
    console.log(proRef);
    if (last < proRef.current.length - 1){
      const newIndex = last + 1
      updateIndex(newIndex)
      await proRef.current[newIndex].current.restoreCard()
    }
  }

  // Reset queue
  const reset = () => {
    setRefresh(!refresh)
    setCardContainerKey(prevKey => prevKey + 1)
  }

  const handleKeyDown = async (event) => {

    const { tagName } = event.target;

    if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
      return;
    }

    console.log("pressed" + event.key)

    if (last >= 0){
  
      if (event.key === 'ArrowLeft') {
        console.log(lastRef.current)
        console.log(proRef.current[lastRef.current].current)
        await proRef.current[lastRef.current].current.swipe("left")
      }
  
      if (event.key === 'ArrowRight') {
        console.log(lastRef.current)
        console.log(proRef.current[lastRef.current].current)
        await proRef.current[lastRef.current].current.swipe("right")
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [])

  const handleChat = async (id, auth_email, name) => {
      if (auth_email === user.email){
        alert("You can't chat with yourself!")
      } else {
        navigate('/chatroom', { state: { fromRedirect: true, proj_id: id, auth_email: auth_email, proj_name: name} })
      }
  }

  return (
    
    <div>
      <div className="card-container" key={cardContainerKey} >
      {resultQueue.current && resultQueue.current.map((project, index) =>
        <TinderCard key={project._id} 
          ref = {proRef.current[index]}
          onSwipe ={() => updateIndex(index - 1)} 
          onCardLeftScreen = {() => outOfFrame(project.title, index)}
          preventSwipe={["down", "up"]} 
          className="cards"
          >
          <div className="card-body">
          <h5 className="creator">Creator: {project.email}</h5>
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
            <button className="interested" onClick={() => {handleChat(project._id, project.email, project.title)}}>💬</button>
          </div>
      </TinderCard>
    )}

    </div>

          <button onClick={goBack} className="button-51">Get back one project</button>
          <button onClick={reset} className="button-52">Show all projects again?</button>

    </div>
  )

}

export default ProjectCard