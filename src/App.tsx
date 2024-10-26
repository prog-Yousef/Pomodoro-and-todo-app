import React, { useState } from 'react';
import { Clock, ListTodo, BarChart2, Settings as SettingsIcon } from 'lucide-react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import Stats from './components/Stats';
import Settings from './components/Settings';
import { PomodoroProvider } from './context/PomodoroContext';

const QUOTES = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "It always seems impossible until it's done. - Nelson Mandela",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
];

function App() {
  const [activeTab, setActiveTab] = useState('timer');
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  return (
    <PomodoroProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Focus Flow
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
              {quote}
            </p>
          </header>

          <nav className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-1">
              <button
                onClick={() => setActiveTab('timer')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'timer'
                    ? 'bg-purple-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Clock size={20} />
                <span>Timer</span>
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'tasks'
                    ? 'bg-purple-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ListTodo size={20} />
                <span>Tasks</span>
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'stats'
                    ? 'bg-purple-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart2 size={20} />
                <span>Stats</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'settings'
                    ? 'bg-purple-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SettingsIcon size={20} />
                <span>Settings</span>
              </button>
            </div>
          </nav>

          <main className="max-w-4xl mx-auto">
            {activeTab === 'timer' && <Timer />}
            {activeTab === 'tasks' && <TaskList />}
            {activeTab === 'stats' && <Stats />}
            {activeTab === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    </PomodoroProvider>
  );
}

export default App;