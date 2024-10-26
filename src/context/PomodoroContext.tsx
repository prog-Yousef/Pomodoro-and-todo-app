import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TimerMode, Task, UserProfile, PomodoroStats } from '../types';

interface State {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  tasks: Task[];
  currentTask: Task | null;
  profile: UserProfile | null;
  stats: PomodoroStats[];
  theme: 'light' | 'dark';
}

const initialState: State = {
  mode: 'work',
  timeLeft: 25 * 60,
  isRunning: false,
  tasks: [],
  currentTask: null,
  profile: null,
  stats: [],
  theme: 'light',
};

type Action =
  | { type: 'SET_MODE'; payload: TimerMode }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'TOGGLE_TIMER' }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_CURRENT_TASK'; payload: Task | null }
  | { type: 'UPDATE_PROFILE'; payload: UserProfile }
  | { type: 'ADD_STATS'; payload: PomodoroStats }
  | { type: 'TOGGLE_THEME' };

const PomodoroContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function pomodoroReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_TIME':
      return { ...state, timeLeft: action.payload };
    case 'TOGGLE_TIMER':
      return { ...state, isRunning: !state.isRunning };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_CURRENT_TASK':
      return { ...state, currentTask: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };
    case 'ADD_STATS':
      return { ...state, stats: [...state.stats, action.payload] };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('pomodoroState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.entries(parsedState).forEach(([key, value]) => {
        dispatch({ type: 'SET_' + key.toUpperCase(), payload: value });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pomodoroState', JSON.stringify(state));
  }, [state]);

  return (
    <PomodoroContext.Provider value={{ state, dispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
}