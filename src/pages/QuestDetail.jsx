import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const QuestDetail = () => {
  const location = useLocation();
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const savedStartTime = localStorage.getItem(`timerStartTime_${location.state.currentQuest._id}`);
    if (savedStartTime) {
      setStartTime(parseInt(savedStartTime));
    }
  }, [location.state.currentQuest._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const leaveTask = () => {
    localStorage.removeItem(`timerStartTime_${location.state.currentQuest._id}`);
    // Additional logic for leaving the task goes here
    alert('add leave task func');
  };

  const completeTask = () => {
    localStorage.removeItem(`timerStartTime_${location.state.currentQuest._id}`);
    // Additional logic for completing the task goes here
    alert('add complete task func');
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div>
        <img
          className="rounded-full bg-gray-300 h-24 w-24 mx-auto mt-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2mtUeJ-RJaVLYKfSms-3ZRIRM73-IPHM1ae5TSG5&s"
          alt=""
        />
      </div>
      <h2 className="text-2xl font-semibold text-center mt-4">{location.state.currentQuest.Quest}</h2>
      <div className="text-center mt-2">Elapsed Time: {formatTime(elapsedTime)}</div>
      <div className="flex justify-center mt-8">
        <button className="px-4 py-2 mr-4 bg-red-500 text-white rounded hover:bg-red-600" onClick={leaveTask}>
          Leave Task
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={completeTask}>
          Complete Task
        </button>
      </div>
    </div>
  );
};

export default QuestDetail;
