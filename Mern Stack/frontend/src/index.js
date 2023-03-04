import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider>
        <App />
      </ProjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);