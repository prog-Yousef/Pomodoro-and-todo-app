import React, { useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { usePomodoro } from '../context/PomodoroContext';
import toast from 'react-hot-toast';

export default function Timer() {
  const { state, dispatch } = usePomodoro();
  const { mode, timeLeft, isRunning } = state;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = useCallback(() => {
    const notification = new Audio('/notification.mp3');
    notification.play();
    
    if (mode === 'work') {
      toast.success('Great job! Time for a break!');
      dispatch({ type: 'SET_MODE', payload: 'shortBreak' });
    } else {
      toast.success('Break is over! Let\'s get back to work!');
      dispatch({ type: 'SET_MODE', payload: 'work' });
    }
  }, [mode, dispatch]);

  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'SET_TIME', payload: timeLeft - 1 });
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleComplete, dispatch]);

  const getTimerColor = () => {
    switch (mode) {
      case 'work':
        return 'from-rose-500 to-purple-500';
      case 'shortBreak':
        return 'from-emerald-400 to-cyan-500';
      case 'longBreak':
        return 'from-blue-400 to-indigo-500';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className={`w-64 h-64 rounded-full flex items-center justify-center bg-gradient-to-br ${getTimerColor()} shadow-xl`}>
        <div className="text-6xl font-bold text-white">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_TIMER' })}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button
          onClick={() => {
            dispatch({ type: 'SET_TIME', payload: 25 * 60 });
            dispatch({ type: 'SET_MODE', payload: 'work' });
          }}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
        >
          <RotateCcw size={24} />
        </button>

        <button
          onClick={() => dispatch({ type: 'SET_MODE', payload: 'shortBreak' })}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
        >
          <Coffee size={24} />
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-full h-2">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getTimerColor()}`}
          style={{
            width: `${((state.profile?.preferences.workDuration * 60 - timeLeft) /
              (state.profile?.preferences.workDuration * 60)) *
              100}%`,
          }}
        />
      </div>
    </div>
  );
}