import { useEffect, useMemo } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useProjectsContext } from "../hooks/useProjectsContext"
import React, { useState } from 'react';
import TinderCard from 'react-tinder-card'
import { Text, View } from 'react-native'



const styles = {
  h1: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: '70%',
    height: 600,
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: 600,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    margin: 10
  },
  cardBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    fontSize: 20,
  },
  cardTag: {
    fontSize: 15,
  },
  buttons: {
    margin: 20,
    zIndex: -100,
    flexDirection: 'row',
  },
  button: {
    marginleft: 10
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
}

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

  let {projects, dispatch} = useProjectsContext()
  let projectQueue = []


  // When card leaves the screen, print a message and reset the state of queue
  const outOfFrame = (project) => {
    console.log(project.title + ' left the screen!')
    projectQueue = projects.filter(pro => pro._id !== project._id)
    projects = projectQueue
  }



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
      <h1 style={styles.h1}>Search Results</h1>
      <View style={styles.cardContainer}>
      
        {searchResults && searchResults.map(project =>
          <TinderCard key = {project._id} onCardLeftScreen={() => outOfFrame(project)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{ project.title }</Text>
              <Text style={styles.cardBody}>Description: { project.description }</Text>

              <Text style={styles.cardBody}> Tags: {" "}
                {project.tags.map(tag => {
                  return <Text key = {tag} style={styles.cardTag}> 
                          {"[" + tag + "] "}
                   </Text>})}
                </Text> 
                <Text style={styles.cardBody}>Number of Teammates: {project.nums} </Text>
            </View>
          </TinderCard>
        )}

      </View>

    </div>
  );  
};
export default Home;