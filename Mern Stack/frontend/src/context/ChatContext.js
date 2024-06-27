import { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client'


export const ChatContext = createContext()

// Create a provider component
export const ChatProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize the WebSocket connection
        // const socket = io('https://waffle.onrender.com')
        setSocket(io('http://localhost:4000'))

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <ChatContext.Provider value={{ socket }}>
            {children}
        </ChatContext.Provider>
    );
};
