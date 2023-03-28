import { View } from 'react-native'
import ProjectCard from '../components/ProjectCard'
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  }

  return (
  
    <View>
          <button onClick={handleClick}>Go to profile</button>

          <ProjectCard />
          
          
        
    </View>

    

    
  )
}

export default Home



