import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('chat-root');
  
  if (!rootElement) {
    console.error('Chat root element not found');
    return;
  }

  try {
    // Create root and render
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('Chat component mounted successfully');
  } catch (error) {
    console.error('Failed to mount chat component:', error);
  }
}); 