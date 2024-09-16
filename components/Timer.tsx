import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

interface TimerProps {
  title: string;
  minutes: number;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ title, minutes, onComplete }) => {
  const [time, setTime] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && !isPaused) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isPaused || !isActive) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, isPaused]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center w-full max-w-xs">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-4xl mb-4">{formatTime(time)}</div>
      <div>
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-full mx-2"
          onClick={() => { setIsActive(true); setIsPaused(false); }}
        >
          <FaPlay />
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded-full mx-2"
          onClick={() => { setIsPaused(!isPaused); }}
        ></button>

{isPaused ? <FaPlay /> : <FaPause />}
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-full mx-2"
          onClick={() => { setIsActive(false); setTime(minutes * 60); }}
        >