// src/pages/index.tsx
import { useState } from 'react';
import Timer from '../../components/Timer';

const Home = () => {
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([]);
  const [taskText, setTaskText] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const [customPomodoro, setCustomPomodoro] = useState(25); // Custom Pomodoro duration in minutes
  const [customShortBreak, setCustomShortBreak] = useState(5); // Custom Short Break duration in minutes
  const [customLongBreak, setCustomLongBreak] = useState(15); // Custom Long Break duration in minutes

  const timerDurations = {
    pomodoro: customPomodoro * 60, // Convert to seconds
    shortBreak: customShortBreak * 60,
    longBreak: customLongBreak * 60,
  };

  const handleFinish = () => {
    if (currentTimer === 'pomodoro') {
      setCurrentTimer('shortBreak');
    } else if (currentTimer === 'shortBreak') {
      setCurrentTimer('pomodoro');
    } else if (currentTimer === 'longBreak') {
      setCurrentTimer('pomodoro');
    }
    setIsPomodoroActive(false);
  };

  const addTask = () => {
    if (taskText.trim() === '') return;
    if (editTaskId !== null) {
      setTasks(tasks.map(task => (task.id === editTaskId ? { ...task, text: taskText } : task)));
      setEditTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: taskText }]);
    }
    setTaskText('');
  };

  const editTask = (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      setTaskText(task.text);
      setEditTaskId(id);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCustomDurationChange = (timer: 'pomodoro' | 'shortBreak' | 'longBreak', value: number) => {
    if (value <= 0) return; // Prevent setting non-positive values
    if (timer === 'pomodoro') {
      setCustomPomodoro(value);
    } else if (timer === 'shortBreak') {
      setCustomShortBreak(value);
    } else if (timer === 'longBreak') {
      setCustomLongBreak(value);
    }
  };

  const duration = timerDurations[currentTimer];

  const renderTimerOptions = () => (
    <div className="bg-gray-800 p-4 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Choose Timer</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => { setCurrentTimer('pomodoro'); setIsPomodoroActive(true); }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Pomodoro
        </button>
        <button
          onClick={() => { setCurrentTimer('shortBreak'); setIsPomodoroActive(true); }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Short Break
        </button>
        <button
          onClick={() => { setCurrentTimer('longBreak'); setIsPomodoroActive(true); }}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Long Break
        </button>
      </div>
    </div>
  );

  const renderTimerScreen = () => (
    <div className="flex flex-col items-center">
      <Timer duration={duration} onFinish={handleFinish} />
      <button
        onClick={() => setIsPomodoroActive(false)}
        className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Back to Main
      </button>
      <div className="mt-4 bg-gray-700 p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">Edit Timer Durations</h3>
        <div className="mb-2">
          <label className="block mb-1">Pomodoro (minutes):</label>
          <input
            type="number"
            value={customPomodoro}
            onChange={(e) => handleCustomDurationChange('pomodoro', parseInt(e.target.value))}
            className="bg-gray-600 text-white p-2 rounded w-full"
            min="1"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Short Break (minutes):</label>
          <input
            type="number"
            value={customShortBreak}
            onChange={(e) => handleCustomDurationChange('shortBreak', parseInt(e.target.value))}
            className="bg-gray-600 text-white p-2 rounded w-full"
            min="1"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Long Break (minutes):</label>
          <input
            type="number"
            value={customLongBreak}
            onChange={(e) => handleCustomDurationChange('longBreak', parseInt(e.target.value))}
            className="bg-gray-600 text-white p-2 rounded w-full"
            min="1"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Pomodoro Timer</h1>
      {isPomodoroActive ? renderTimerScreen() : renderTimerOptions()}
      {!isPomodoroActive && (
        <div className="mt-8">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded"
            placeholder="Add or edit task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            {editTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      )}
      {!isPomodoroActive && (
        <ul className="mt-4">
          {tasks.map(task => (
            <li key={task.id} className="bg-gray-800 p-2 rounded mb-2 flex justify-between items-center">
              {task.text}
              <div>
                <button
                  onClick={() => editTask(task.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
