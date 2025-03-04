import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { TaskboardProvider } from './context/TaskboardProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <TaskboardProvider>
            <App />
        </TaskboardProvider>
    </AuthProvider>
);
