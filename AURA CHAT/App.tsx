
import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import ChatInterface from './components/ChatInterface';

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

  if (!username) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <ChatInterface username={username} />;
};

export default App;
