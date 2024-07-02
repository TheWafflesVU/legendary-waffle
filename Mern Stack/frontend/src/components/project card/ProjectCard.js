import React from 'react'
import TinderCard from 'react-tinder-card'
import { useEffect, useState, useRef }from 'react'
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'
import UserSnapshot from "./UserSnapshot"
import ProjectDetails from "./ProjectDetails"
import './ProjectCard.css'

import RestorePageIcon from '@mui/icons-material/RestorePage'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import {useChatContext} from "../../hooks/useChatContext";

const ProjectCard = () => {

  // Authentication & Projects
  const {projects, dispatch} = useProjectsContext()
  const {user} = useAuthContext()

  // Chatroom
  const {createAndJoin} = useChatContext()

  // For navigating the user to chatroom
  const navigate = useNavigate()

  // This will always store an array of the references to all TinderCard components (even if they are swiped/out of frame)
  const cardRefs = useRef([])

  // Store the index of the top of project array. Changing this will trigger re-render
  const [last, setLast] = useState(0)

  // Used for outOfFrame closure
  const lastIndexRef = useRef({})

  // Used for locking the view when swiping
  const cardContainerRef = useRef({})

  useEffect(() => {

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        swipe('left')
      } else if (event.key === 'ArrowRight') {
        swipe('right')
      } else if (event.key === 'ArrowDown') {
        GetLastCard()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [last])

  // When user is changed, fetch the projects again
  useEffect(() =>  {
    const fetchProjects = async () => {
      const response = await fetch('/api/project/all', {
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
      setLast(projects.length - 1 )
      cardRefs.current = Array(projects.length).fill(0).map(() => React.createRef())
      lastIndexRef.current = last
    }
  }, [projects])

  // This function will update the index to the last project as well as the reference to the last project
  const updateCurrentIndex = (val) => {
    setLast(val)
    lastIndexRef.current = val
  }

  const HandleOutOfFrame = (idx) => {

    cardContainerRef.current.style.pointerEvents = 'auto'
    // handle the case in which go back is pressed before card goes outOfFrame
    if (lastIndexRef.current >= idx){
      cardRefs[idx].current.restoreCard()
    }
  }

  const swipe = async (dir) => {
    if (cardRefs.current.length > 0 && last < cardRefs.current.length) {
      await cardRefs.current[last].current.swipe(dir) // Swipe the card!
    }
  }

  // Get the last swiped card back. Can be clicked multiple times to retrieve multiple cards.
  const GetLastCard = async () => {
    if (last < cardRefs.current.length - 1){
      const newIndex = last + 1
      updateCurrentIndex(newIndex)
      await cardRefs.current[newIndex].current.restoreCard()
    }
  }

  const onSwipeHandler = () => {
    updateCurrentIndex(last - 1)
    cardContainerRef.current.style.pointerEvents = 'none'
  }


  // Redirects the user to chatroom page
  const handleChat =  (id, project_id) => {

    if (user) {
      createAndJoin(user.user_id, id, project_id)
      navigate(`/chatroom`)
    }

  }


  return (

      <div className="mainCardsView">

        <div className="cardListContainer" ref={cardContainerRef}>

          <div className="cardListBase">
            <p>All Projects displayed!</p>
            <button>Wanna see more?</button>
          </div>

          {projects && projects.map((project, index) => {

            if (project.email !== user.email){
              return (
                  <TinderCard key={project._id}
                              ref={cardRefs.current[index]}
                              swipeRequirementType="position"
                              preventSwipe={['up', 'down']}
                              onSwipe={onSwipeHandler}
                              onCardLeftScreen={(index) => HandleOutOfFrame(index)}
                              className="cardContainer">

                    <div className="cardHeader">
                      <button onClick={() => {handleChat(project.user_id, project._id)}}>Interested?</button>
                    </div>

                    <div className="cardContent">
                      <UserSnapshot userId={project.user_id} />
                      <ProjectDetails project={project} />
                    </div>

                  </TinderCard>
              )}})}

        </div>

        <div className="helper-button-container">

          <div className="restore-leftArrow-button">
            <ArrowCircleLeftIcon fontSize="large" onClick={() => {swipe('left')}}/>
          </div>

          <div className="restore-leftArrow-button">
            <RestorePageIcon fontSize="large" onClick={() => {GetLastCard()}}/>
          </div>


          <div className="restore-leftArrow-button">
            <ArrowCircleRightIcon fontSize="large" onClick={() => {swipe('right')}}/>
          </div>
        </div>

      </div>
  )

}

export default ProjectCard
