import {createContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useAuthContext} from "../hooks/useAuthContext";

export const ChatContext = createContext()

// Create a provider component
export const ChatProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [chatroomList, setChatroomList] = useState([])
    const {user} = useAuthContext()

    useEffect(() => {
        setSocket(io(process.env.SERVER_URL));
        return () => socket.close();
    }, [])


    useEffect(() => {
        if (user) {
            fetch(`/api/chatroom/all/${user.user_id}`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
                .then((res) => res.json())
                .then((data) => setChatroomList(data));
        }
    }, [user]);


    useEffect(() => {
        if (socket) {
            socket.on('receive_message', (message) => {
                setMessages(prevList => [...prevList,  message]);
            })
        }
    }, [socket]);


    useEffect(() => {

        if (activeChat) {
            // Fetch chatroom messages from backend
            fetch(`/api/message/${activeChat}`, {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
                .then((res) => res.json())
                .then((data) => setMessages(data));
        }

    }, [activeChat])


    const createAndJoin = (user1_id, user2_id, project_id) => {
        if (socket) {

            // Check if chatroom exists before joining. If not, create one and join it.
            fetch(`/api/chatroom/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user1_id,
                    user2_id,
                    project_id
                })
            })
                .then(async (res) => {

                    const roomInfo = await res.json()

                    if (res.status === 201) {
                        console.log(roomInfo)
                        setChatroomList(prevList => [...prevList, roomInfo])
                    }

                    setActiveChat(roomInfo._id)
                    socket.emit('join_room', roomInfo._id)

                })
        }
    }

    const rejoin = (chat_room_id) => {
        if (socket) {
            setActiveChat(chat_room_id)
            socket.emit('join_room', chat_room_id);
        }
    }

    return (
        <ChatContext.Provider value={{ createAndJoin, rejoin, activeChat, messages, chatroomList }}>
            {children}
        </ChatContext.Provider>
    );
};

