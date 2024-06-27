import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectContext'
import { AuthContextProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <AuthContextProvider>
      <ProjectsContextProvider>
          <ChatProvider>
              <App />
          </ChatProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>

);



