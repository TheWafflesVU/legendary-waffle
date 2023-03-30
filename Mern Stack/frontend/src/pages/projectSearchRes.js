import { useEffect, useMemo } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useProjectsContext } from "../hooks/useProjectsContext"
import React, { useState } from 'react';
import TinderCard from 'react-tinder-card'
import styles from "./projectSearchRes.css"



const Home = () => {

  const { user } = useAuthContext()
  const [searchResults, setSearchResults] = useState([])
  let projectQueue = []

  // Extract search keyword from query parameter
  const searchTag = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tag') || '';
  }, []);

  const searchKeyword = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  }, []);

  // When card leaves the screen, print a message and reset the state of queue
  const outOfFrame = (project) => {
    console.log(project.title + ' left the screen!')
    projectQueue = searchResults.filter(pro => pro._id !== project._id)
    setSearchResults(projectQueue)
  }

  const highlightText = (text, keyword) => {
    if (!keyword) {
      return text;
    }
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (user !== null) {
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

    if (user){
      fetchResults()
      projectQueue = searchResults
    }

  }, [user]);


  return (
    <div>
    <div className="result-info">
      <p>Total search results: {searchResults.length}</p>
    </div>
    
    <div className="card-container">
  {searchResults && searchResults.map(project =>
    <TinderCard key={project._id} onCardLeftScreen={() => outOfFrame(project)} className="cards">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <div className="d-flex justify-content-between">
          <p className="card-text mb-0">
            <i className="bi bi-people"></i> Teammates: {project.nums}
          </p>
          <div className="tags">
            {project.tags.map(tag => {
              const highlightedTag = highlightText(tag, searchTag);
              return <span key={tag} className="card-tag badge bg-primary" dangerouslySetInnerHTML={{ __html: highlightedTag }} />;
            })}
          </div>
        </div>
        <hr />
        <p className="card-des" dangerouslySetInnerHTML={{ __html: highlightText(project.description, searchKeyword) }}></p>
      </div>
    </TinderCard>
  )}
  </div>
</div>
    
  )
};
export default Home;