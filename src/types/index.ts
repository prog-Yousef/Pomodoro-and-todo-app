export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    soundEnabled: boolean;
    notificationsEnabled: boolean;
    theme: 'light' | 'dark';
  };
}

export interface PomodoroStats {
  date: string;
  completedSessions: number;
  totalMinutes: number;
  tasks: number;
}