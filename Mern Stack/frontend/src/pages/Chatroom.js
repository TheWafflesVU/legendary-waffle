import { View } from 'react-native'
import { ChatEngine } from 'react-chat-engine'
import { useAuthContext } from "../hooks/useAuthContext"



function Chatroom() {

  const { user } = useAuthContext()



  return (
    <View style={{ minHeight: 1000, marginLeft: 80}}>

 
      <ChatEngine
        projectID={"416cbe47-d721-4da1-bc97-535c137d25f9"}
        userName={user.email}
        userSecret={user.email}
      />

    </View>
    
  )
}

export default Chatroom