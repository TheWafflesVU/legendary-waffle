import { useMemo } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState, useRef } from 'react';
import TinderCard from 'react-tinder-card'
import styles from "./projectSearchRes.css"


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
    const newIndex = last + 1
    updateIndex(newIndex)
    await proRef.current[newIndex].current.restoreCard()
  }

  // Reset queue
  const reset = () => {
    setRefresh(!refresh)
    setCardContainerKey(prevKey => prevKey + 1);
  }

  const highlightText = (text, keyword) => {
    if (!keyword) {
      return text;
    }
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };


  return (
     
    <div>


    <div className="result-info">
      <p>Total search results: {searchResults.length}</p>
    </div>
    <div className="card-container" key={cardContainerKey}>
    {resultQueue.current && resultQueue.current.map((project, index) =>
      <TinderCard key={project._id} 
        ref = {proRef.current[index]}
        onSwipe ={() => updateIndex(index - 1)} 
        onCardLeftScreen = {() => outOfFrame(project.title, index)}
        preventSwipe={"down"} 
        className="cards"
        >
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


      <button onClick={goBack} className="button-51">Regret button</button>
      <button onClick={reset} className="button-51">Show results again?</button>
  
  </div>
)

};
export default Home;