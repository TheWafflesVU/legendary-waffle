import "../index.css"
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  // Extract search tag from query parameter
  const searchTag = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tag') || '';
  }, []);

  // Extract search keywords from query parameter
  const searchKeyword = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  }, []);

  // Authentication & Projects
  const { user } = useAuthContext()
  const [searchResults, setSearchResults] = useState([])

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (user) {
        const response = await fetch(`/api/projects/search/${searchTag}/${searchKeyword}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        });
        const data = await response.json();
        setSearchResults(data);
      }
    }

    if (user) {
      console.log("fetching projects")
      fetchResults()
    }
  }, [user, refresh])


  // Set the queues
  useEffect(() => {
    if (Array.isArray(searchResults)){
      console.log("updating queues")
      resultQueue.current = searchResults
      lastRef.current = searchResults.length - 1 
      setlast(lastRef)
      proRef.current = Array(searchResults.length).fill(0).map((i) => React.createRef())
      setCardContainerKey(prevKey => prevKey + 1);
    }
  }, [searchResults])

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
    if (last < proRef.current.length - 1){
      const newIndex = last + 1
      updateIndex(newIndex)
      await proRef.current[newIndex].current.restoreCard()
    }
  }

  // Reset queue
  const reset = () => {
    setRefresh(!refresh)
    setCardContainerKey(prevKey => prevKey + 1);
  }

  const handleKeyDown = async (event) => {

    const { tagName } = event.target;

    if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
      return
    }

    console.log("pressed" + event.key)

    if (last >= 0){
      if (event.key === 'ArrowLeft') {
        console.log(lastRef.current)
        await proRef.current[lastRef.current].current.swipe("left")
      }
  
      if (event.key === 'ArrowRight') {
        console.log(lastRef.current)
        await proRef.current[lastRef.current].current.swipe("right")
      }
    }

  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
      
    <div className="card-container-result-page" key={cardContainerKey}>
    {resultQueue.current && resultQueue.current.map((project, index) =>
      <TinderCard key={project._id} 
        ref = {proRef.current[index]}
        onSwipe ={() => updateIndex(index - 1)} 
        onCardLeftScreen = {() => outOfFrame(project.title, index)}
        preventSwipe={["down","up"]} 
        className="cards-result-page"
        >
        <div className="card-body-result-page">
        <h5 className="creator">Creator: {project.email}</h5>
          <h5 className="card-title-result-page">{project.title}</h5>
          <div className="d-flex justify-content-between">
            <p className="card-text mb-0">
              <i className="bi bi-people"></i> Teammates: {project.nums}
            </p>
            <div className="tags-result-page">
              {project.tags.map(tag => {
                return <span key={tag} className="card-tag badge bg-primary">
                  {tag}
                </span>
              })}
            </div>
          </div>
          <hr />
          <p className="card-des-result-page">{project.description}</p>
          <button className="interested" onClick={() => {handleChat(project._id, project.email, project.title)}}>💬</button>
        </div>
    </TinderCard>
  )}

  </div>

      <button onClick={goBack} className="button-51-result-page">Regret button</button>
      <button onClick={reset} className="button-52-result-page">Show results again?</button>
  
  </div>
)

};
export default Home;
