import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Aura Chat</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Enter a username to begin</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:z-10 sm:text-sm ${themeClasses.ring} ${themeClasses.border}`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${themeClasses.bg} ${themeClasses.hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeClasses.ring}`}
              style={themeClasses.style}
            >
              Start Chatting
            </button>
          </div>
        </form>
         <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
            Your session is stored locally. No data is saved on a server.
         </p>
      </div>
    </div>
  );
};

export default LoginScreen;