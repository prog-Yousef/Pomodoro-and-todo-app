import React from 'react';
import { BarChart, Clock, CheckCircle } from 'lucide-react';
import { usePomodoro } from '../context/PomodoroContext';
import { format, startOfWeek, eachDayOfInterval } from 'date-fns';

export default function Stats() {
  const { state } = usePomodoro();
  const { stats } = state;

  const weekStart = startOfWeek(new Date());
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: new Date(),
  });

  const weeklyStats = weekDays.map((day) => {
    const dayStats = stats.find(
      (s) => s.date === format(day, 'yyyy-MM-dd')
    );
    return {
      date: format(day, 'EEE'),
      sessions: dayStats?.completedSessions || 0,
    };
  });

  const totalSessions = stats.reduce(
    (acc, curr) => acc + curr.completedSessions,
    0
  );
  const totalMinutes = stats.reduce(
    (acc, curr) => acc + curr.totalMinutes,
    0
  );
  const totalTasks = stats.reduce(
    (acc, curr) => acc + curr.tasks,
    0
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Total Sessions</h3>
          </div>
          <p className="text-3xl font-bold">{totalSessions}</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Total Minutes</h3>
          </div>
          <p className="text-3xl font-bold">{totalMinutes}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Completed Tasks</h3>
          </div>
          <p className="text-3xl font-bold">{totalTasks}</p>
        </div>
      </div>

      <div className="relative h-64">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="flex items-end justify-between h-48">
          {weeklyStats.map((day) => (
            <div
              key={day.date}
              className="flex flex-col items-center space-y-2"
            >
              <div
                className="w-12 bg-purple-500 rounded-t-lg transition-all duration-300"
                style={{
                  height: `${(day.sessions / Math.max(...weeklyStats.map((d) => d.sessions))) * 100}%`,
                }}
              />
              <span className="text-sm font-medium">{day.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}