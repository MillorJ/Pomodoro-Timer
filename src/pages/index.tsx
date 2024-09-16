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
    