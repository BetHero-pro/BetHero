import React, { useState, useRef, useEffect } from 'react';

function Timer({ taskId }) {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const startTimer = e => {
    e.preventDefault();
    const startTime = Date.now();
    localStorage.setItem(`timerStartTime_${taskId}`, startTime.toString());
    timerRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
  };

  const stopTimer = e => {
    e.preventDefault();
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = e => {
    e.preventDefault();
    setSeconds(0);
    stopTimer(e);
    localStorage.removeItem(`timerStartTime_${taskId}`);
  };

  useEffect(() => {
    const startTime = localStorage.getItem(`timerStartTime_${taskId}`);
    if (startTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      setSeconds(elapsedTime);

      timerRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [taskId]);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col justify-center items-center content-center">
      <h1 className="text-[24px]">{formatTime(seconds)}</h1>
      <div className="flex space-x-2 justify-center">
        <button className="w-18 h-18 p-1 text-green-500 rounded-md bg-white" onClick={startTimer}>
          Start
        </button>
        <button className="w-18 h-18 p-1 text-red-400 rounded-md bg-white" onClick={stopTimer}>
          Stop
        </button>
        <button className="w-18 h-18 p-1 text-gray-500 rounded-md bg-white" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
