import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectContext'
import { AuthContextProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import { TagProvider } from "./context/TagContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <AuthContextProvider>
      <ProjectsContextProvider>
          <ChatProvider>
              <TagProvider>
                  <App />
              </TagProvider>
          </ChatProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>

);



