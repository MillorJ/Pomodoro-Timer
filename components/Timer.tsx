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