import { useState, useRef, useEffect } from 'react';

const SECONDS_IN_A_DAY = 24 * 60 * 60;

function TimerBetComponent() {
  const [seconds, setSeconds] = useState(SECONDS_IN_A_DAY);
  const timerRef = useRef(null);

  useEffect(() => {
    const startTime = localStorage.getItem('betTimer');
    if (startTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      setSeconds(SECONDS_IN_A_DAY - elapsedTime);

      timerRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // check if localStorage exist
  if (localStorage.getItem('betTimer') === null) {
    return;
  }

  return <div>{formatTime(seconds)}</div>
}

export default TimerBetComponent;
