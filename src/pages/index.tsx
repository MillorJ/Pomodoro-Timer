import { useState } from 'react';
import Timer from '../../components/Timer';

const Home = () => {
    const [activeTimer, setActiveTimer] = useState<'pomodoro' | 'short' | 'long' | null>(null);
    const [pomodoroCount, setPomodoroCount] = useState(0);