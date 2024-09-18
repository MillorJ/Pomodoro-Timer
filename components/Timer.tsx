// src/components/Timer.tsx
import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // Duration in seconds
  onFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
    } else if (timeLeft === 0) {
      onFinish();
      setIsActive(false);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isActive, timeLeft, onFinish]);

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = new Audio('/alarm.mp3'); // Ensure you have an alarm sound at public/alarm.mp3
      audio.play();
    }
  }, [timeLeft]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-lg">
      <h2 className="text-xl font-bold mb-2">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h2>
      <div className="flex space-x-2">
        <button
          onClick={startTimer}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
