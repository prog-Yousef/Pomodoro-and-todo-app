import React, { useState } from 'react';
import { Plus, Check, Trash2, Edit } from 'lucide-react';
import { usePomodoro } from '../context/PomodoroContext';
import { Task } from '../types';

export default function TaskList() {
  const { state, dispatch } = usePomodoro();
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      pomodoros: 0,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_TASK', payload: task });
    setNewTask('');
  };

  const handleEdit = (task: Task) => {
    if (editingId === task.id) {
      setEditingId(null);
    } else {
      setEditingId(task.id);
      setNewTask(task.title);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      
      <form onSubmit={handleAddTask} className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-2">
        {state.tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_TASK',
                    payload: { ...task, completed: !task.completed },
                  })
                }
                className={`p-1 rounded-full ${
                  task.completed ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <Check size={16} className="text-white" />
              </button>
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(task)}
                className="p-1 hover:text-purple-500"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() =>
                  dispatch({ type: 'DELETE_TASK', payload: task.id })
                }
                className="p-1 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}