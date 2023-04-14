import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <AuthContextProvider>
      <ProjectsContextProvider>
        <App />
      </ProjectsContextProvider>
    </AuthContextProvider>

);



