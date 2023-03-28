import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ChatEngine, Socket } from 'react-chat-engine'
import { useAuthContext } from "../hooks/useAuthContext"



function Chatroom() {

  const { user } = useAuthContext()

  return (
    <View style={{ minHeight: 1000, marginLeft: 80}}>

    <ChatEngine 
      projectID={"416cbe47-d721-4da1-bc97-535c137d25f9"}
      userName={user.email}
      userSecret={user.email}
      onConnect={(creds) => console.log(creds)}
			onFailAuth={(props) => console.log(props)}
			onNewChat={(chat) => console.log(chat)}
			onEditChat={(chat) => console.log(chat)}
			onDeleteChat={(chat) => console.log(chat)}
			onNewMessage={(chatId, message) => console.log(chatId, message)}
			onEditMessage={(chatId, message) => console.log(chatId, message)}
			onDeleteMessage={(chatId, message) => console.log(chatId, message)}
    />

    </View>
  )
}

export default Chatroom