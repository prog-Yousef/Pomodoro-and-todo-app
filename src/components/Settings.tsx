import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, Volume2, BellRing } from 'lucide-react';
import { usePomodoro } from '../context/PomodoroContext';

export default function Settings() {
  const { state, dispatch } = usePomodoro();
  const { profile, theme } = state;

  const handleProfileUpdate = (updates: Partial<typeof profile>) => {
    if (profile) {
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { ...profile, ...updates },
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <SettingsIcon className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Timer Duration</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Work</label>
              <input
                type="number"
                value={profile?.preferences.workDuration || 25}
                onChange={(e) =>
                  handleProfileUpdate({
                    preferences: {
                      ...profile?.preferences,
                      workDuration: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Short Break</label>
              <input
                type="number"
                value={profile?.preferences.shortBreakDuration || 5}
                onChange={(e) =>
                  handleProfileUpdate({
                    preferences: {
                      ...profile?.preferences,
                      shortBreakDuration: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                max="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Long Break</label>
              <input
                type="number"
                value={profile?.preferences.longBreakDuration || 15}
                onChange={(e) =>
                  handleProfileUpdate({
                    preferences: {
                      ...profile?.preferences,
                      longBreakDuration: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                max="60"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>Sound</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile?.preferences.soundEnabled}
              onChange={(e) =>
                handleProfileUpdate({
                  preferences: {
                    ...profile?.preferences,
                    soundEnabled: e.target.checked,
                  },
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BellRing className="w-5 h-5" />
            <span>Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile?.preferences.notificationsEnabled}
              onChange={(e) =>
                handleProfileUpdate({
                  preferences: {
                    ...profile?.preferences,
                    notificationsEnabled: e.target.checked,
                  },
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {theme === 'light' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span>Theme</span>
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>
    </div>
  );
}