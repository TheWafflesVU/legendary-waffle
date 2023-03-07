import { useEffect, useMemo } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useState } from 'react';

const Home = () => {
  const { user } = useAuthContext();
  const [searchResults, setSearchResults] = useState([]);

  // Extract search keyword from query parameter

  const searchTag = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tag') || '';
  }, []);

  const searchKeyword = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  }, []);

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
    };
    fetchResults();
  }, [user, searchKeyword]);


  return (
    <div>
      <h1>Search Results</h1>
      <div className="search-results-container">
        {searchResults.map((result) => (
          <div className="search-result" key={result.id}>
            <h4>{result.title}</h4>
            <p><strong>Description: </strong>{result.description}</p>
            <p><strong>Required members: </strong>{result.nums}</p>
            <strong>Project Tags: </strong>
            <ul>
              {result.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
};

export default Home;
