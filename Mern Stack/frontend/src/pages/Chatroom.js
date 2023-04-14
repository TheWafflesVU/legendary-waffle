import styles from "./Chatroom.css"
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import ScrollToBottom from "react-scroll-to-bottom"

function Chatroom({socket}) {

  const { user } = useAuthContext()

  const [room, setRoom] = useState("")

  const [joined, setJoined] = useState(false)

  const [currentMessage, setCurrentMessage] = useState("")

  const [messageList, setMessageList] = useState([])

  const [roomList, setRoomList] = useState([])
  
  // Function for fetching all the rooms current user is in
  // Author: Junhao Hui
  const fetchRooms = async () => {
    const response = await fetch("api/user/room_num", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    setRoomList(json)
  }

  // Function for fetching messages based on room number
  // Author: Junhao Hui
  const fetchMessages = async () => {
    const response = await fetch('/api/message/' + room, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
    })

    const json = await response.json()
    setMessageList(json)
  }

  // Function for storing new message into the database
  // Author: Junhao Hui
  const storeMessage = async (messageData) => {

    const response = fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify(messageData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

    const json = await response
  } 

  // Function for adding the current room number to current user
  // Author: Junhao Hui
  const addRoom = async () => {

    const response = await fetch('/api/user/join_room', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ "room_number": room })
    })

    const json = await response.json()
    console.log(json.message)
  }

  // Join room based on user input. Also add the current room to user's backend data
  // Author: Junhao Hui
  const joinRoom = async () => {
    if (room !== "") {
      socket.emit("join_room", room)
      if (!roomList.includes(room)){
        await addRoom()
        setRoomList([...roomList, room])
      }
      await fetchMessages()
      setJoined(true)
    } 
  }
  
  // Leave Current Room
  // Author: Junhao Hui
  const leaveRoom = () => {
    setJoined(false)
  }

  // Send Message; Store message in db; update current queue
  // Author: Junhao Hui
  const sendMessage = async () => {

    if (currentMessage !== ""){
      const messageData = {
        room: room, 
        author: user.email,
        message: currentMessage,
        time: 
          new Date(Date.now()).getHours() + 
          ":" + 
          new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", messageData)
      setMessageList((list) => [...list, messageData]);
      await storeMessage(messageData)
      setCurrentMessage("")
    }
  }

  const reJoin = (roomNumber) => {
    setRoom(roomNumber)
    setJoined(false)
    joinRoom()
  }

  useEffect(() =>{
    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data])
    })
  }, [socket])

  useEffect(() => {
    if (user)
      fetchRooms()
  }, [user])

  return (
    <div className="chat-app-container">
     
        <div className="joinChatContainer">

        <input
              type="text"
              placeholder="Room ID..."
              onChange={(e) => setRoom(e.target.value)}
            />
        <button onClick={joinRoom}>Join A Room</button>
        </div>
      <div className="button-container">
        {roomList.length !== 0 && roomList.map((single_room) => {
            return (<button onClick={() => reJoin(single_room)}> Room: {single_room}</button>)
          })}
      </div>
   
        <div className="chat-window">
          <div className="chat-header">
            {joined ? <p>Currnet Room: {room}</p> : <p>Join/Select Room</p>}
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {joined && messageList && messageList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={user.email === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                     </div>
                     <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>

        </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Spotlight's on you. Don't say anything bad plz"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
          <button onClick={leaveRoom}>Leave Room</button>
      </div>
    
    </div>
  );
}

export default Chatroom