import React from 'react'
import "./Chatroom.css"
import {useChatContext} from "../hooks/useChatContext";
import ChatWindow from "../components/chatroom/ChatWindow";

const Chatroom = () => {

    const {rejoin, chatroomList, activeChat} = useChatContext()

    return (
        <div className="chatroom-container">
            <div className="chatroom-list">
                <h3>My Inbox</h3>
                <ul>
                    {chatroomList && chatroomList.map((room) => (
                        <li
                            key={room._id}
                            onClick={() => rejoin(room._id)}
                            className={activeChat === room._id ? 'active-chatroom' : ''}>
                            {room.project_id.title}
                        </li>
                    ))}
                </ul>
            </div>
            <ChatWindow />
        </div>

    );


}

export default Chatroom
