import { useState } from 'react';
import Timer from '../../components/Timer';

const Home = () => {
    const [activeTimer, setActiveTimer] = useState<'pomodoro' | 'short' | 'long' | null>(null);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [task, setTask] = useState('');

    const startPomodoro = () => {
      setActiveTimer('pomodoro');
    };

    const startShortBreak = () => {
      setActiveTimer('short');
    };
  
    const startLongBreak = () => {
      setActiveTimer('long');
    };

    const handlePomodoroComplete = () => {
      setActiveTimer(null);
      setPomodoroCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount % 4 === 0) {
          setTimeout(() => startLongBreak(), 100);
        } else {
          setTimeout(() => startShortBreak(), 100);
        }
        return newCount;
      });
    };

    const handleBreakComplete = () => {
      startPomodoro();
    };

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6">Pomodoro Timer</h1>

        <div className="flex flex-col items-center gap-4 mb-6">
        {activeTimer === 'pomodoro' && (
          <Timer title="Pomodoro" minutes={25} onComplete={handlePomodoroComplete} />
        )}
        {activeTimer === 'short' && (
          <Timer title="Short Break" minutes={5} onComplete={handleBreakComplete} />
        )}

)}
        {activeTimer === 'long' && (
          <Timer title="Long Break" minutes={15} onComplete={handleBreakComplete} />
        )}
        {activeTimer === null && (
          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md mr-2"
              onClick={startPomodoro}
            >

Start Pomodoro
            </button>
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md mx-2"
              onClick={startShortBreak}
            >
              Start Short Break
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md ml-2"
              onClick={startLongBreak}
            >
              Start Long Break
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-md">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter your tasks here..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />