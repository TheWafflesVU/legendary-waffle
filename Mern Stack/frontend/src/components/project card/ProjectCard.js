import React from 'react'
import TinderCard from 'react-tinder-card'
import { useEffect, useState, useRef }from 'react'
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';


const CardContainer = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


const ProjectCard = () => {

  // Authentication & Projects
  const {projects, dispatch} = useProjectsContext()
  const {user} = useAuthContext()

  // For navigating the user to chatroom
  const navigate = useNavigate()

  // This will always store a copy of the resulting array of project from the initial database query. (all projects)
  const allProjectRefs = useRef([])

  // This will always store an array of the references to the initial TinderCard components (even if they are swiped)
  const cardRefs = useRef([])

  // Store the index of the top of project array. Changing this will trigger re-render
  const [last, setLast] = useState(0)

  // When user is changed, fetch the projects again
  useEffect(() =>  {
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
      fetchProjects().then(() => console.log("All Projects fetched!"))
    }
  }, [user])


  // This useEffect will be triggered whenever [projects] array is updated. It will also trigger re-render by calling
  // setLast()
  useEffect(() => {
    if (Array.isArray(projects)){
      allProjectRefs.current = [...projects]
      setLast(projects.length - 1 )
      cardRefs.current = Array(projects.length).fill(0).map((i) => React.createRef())
    }
  }, [projects])


  // Get the last swiped card back. Can be clicked multiple times to retrieve multiple cards.
  const GetLastCard = async () => {
    if (last < cardRefs.current.length - 1){
      const newIndex = last + 1
      setLast(newIndex)
      await cardRefs.current[newIndex].current.restoreCard()
    }
  }


  // Redirects the user to chatroom page
  const handleChat =  (id, auth_email, name) => {
      if (auth_email !== user.email){
        navigate('/chatroom', { state: { fromRedirect: true, proj_id: id, auth_email: auth_email, proj_name: name} })
      }
  }


  return (

        <CardContainer>
          {allProjectRefs.current && allProjectRefs.current.map((project, index) =>(
              <TinderCard key={project._id}
                          ref={cardRefs.current[index]}
                          onSwipe={() => setLast(index - 1)}
                          preventSwipe={["down", "up"]}
                          className="cards">
              </TinderCard>))}
        </CardContainer>
  )

}

export default ProjectCard