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