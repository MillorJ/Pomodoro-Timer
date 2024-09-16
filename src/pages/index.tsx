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
