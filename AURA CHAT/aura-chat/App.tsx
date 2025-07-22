import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import ChatInterface from './components/ChatInterface';
import { ThemeProvider } from './components/ThemeContext';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('chat-username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = (name: string) => {
    localStorage.setItem('chat-username', name);
    setUsername(name);
  };

  return (
    <ThemeProvider>
      {!username ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ChatInterface username={username} />
      )}
    </ThemeProvider>
  );
};

export default App;
