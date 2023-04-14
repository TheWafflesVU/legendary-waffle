import styles from "./Chatroom.css"
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import ScrollToBottom from "react-scroll-to-bottom"




function Chatroom({socket}) {

  const { user } = useAuthContext()
  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

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
      setMessageList((list) => [...list, messageData])
      setCurrentMessage("")

    }
  }

  useEffect(() =>{

    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data])
    })

  }, [socket])

  return (
    <div className="App">
     
        <div className="joinChatContainer">

          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Message..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
          />

          <button onClick={joinRoom}>Join A Room</button>
          <button onClick={sendMessage}>Se</button>
        </div>
        <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
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
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
      
    </div>
  );
}

export default Chatroom