import React, {useEffect, useRef, useState} from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatContext } from '../../hooks/useChatContext';

export const ChatWindow = () => {
    const { user } = useAuthContext();
    const [text, setText] = useState('');
    const { activeChat, messages } = useChatContext();
    const messagesEndRef = useRef(null);
    const [userList, setUserList] = useState([]);
    const [title, setTitle] = useState('');


    useEffect(() => {

        if (activeChat) {
            const getDetails = () => fetch(`/api/chatroom/${activeChat}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            })

            getDetails()
                .then((res) => res.json())
                .then((data) => {
                    setUserList(data.users);
                    setTitle(data.project_id.title);
                })
        }

    }, [user, activeChat])

    const sendMessage = async () => {
        if (text.trim()) {
            await fetch('/api/message/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatroom_id: activeChat,
                    author_id: user.user_id,
                    content: text
                })
            });
            setText('');
        }
    }

    const scrollToBottom = () => {
        const messagesContainer = document.querySelector('.messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const getUserName = (userId) => {
        const user = userList.find(u => u._id === userId);
        return user ? user.firstName + " " + user.lastName : 'Unknown User';
    };

    return (
        <div className="chat-window">
            <h3>{title}</h3>
            <div className="messages" ref={messagesEndRef} >
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user_id === user.user_id ? 'sent' : 'received'}`}>
                        <strong>{getUserName(message.user_id)}</strong>
                        <div className="message-content">
                            {message.content}
                        </div>
                        <div className="message-timestamp">
                            {new Date(message.created_at).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>

            {activeChat && (
                <div className="input-container">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}

        </div>
    );
};

export default ChatWindow;
