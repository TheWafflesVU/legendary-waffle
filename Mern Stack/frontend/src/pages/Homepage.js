import { Text, View } from 'react-native'
import TinderCard from 'react-tinder-card'
import { useEffect }from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import ProjectForm from '../components/ProjectForm'


const styles = {
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
  
    <View style={styles.container}>

      <View style={styles.cardContainer}>
        
        {projects && projects.map(project =>
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
          
          <ProjectForm />
        
    </View>
  )
}

export default Home



