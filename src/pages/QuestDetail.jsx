import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, ForwardIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { deleteQuest, fetchAllQuests1 } from '../fetches';

const QuestDetail = () => {
  const location = useLocation();
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questIndex, setQuestIndex] = useState(0);
  const timerRef = useRef(null);
  useEffect(() => {
    const savedStartTime = localStorage.getItem(`timerStartTime_${location.state.taskid}`);
    if (savedStartTime) {
      setStartTime(parseInt(savedStartTime));
    }
  }, [location.state.taskid]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (startTime) {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

        setElapsedTime(elapsedSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [startTime]);

  const stopTimer = e => {
    e.preventDefault();
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const leaveTask = e => {
    localStorage.removeItem(`timerStartTime_${location.state.currentQuest._id}`);
    // Additional logic for leaving the task goes here
    setElapsedTime(0);
    e.preventDefault();
    stopTimer(e);
    navigate('/');
  };

  const completeTask = async e => {
    localStorage.removeItem(`timerStartTime_${location.state.currentQuest._id}`);
    // Additional logic for completing the task goes here

    e.target.disabled = true;
    await deleteQuest(location.state.currentQuest._id);

    e.target.disabled = false;

    const { data, result } = await fetchAllQuests1(location.state.userid);
    console.log(result);

    if (!result) return;

    if (data?.length > 0) {
      // now we have to conside dnd order this is why applying sort
      const questions = [...data].sort((a, b) => a.order - b.order);
      console.log('sorted data is');
      console.log(questions);
      const savedStartTime = localStorage.getItem(`timerStartTime_${questions[0]._id}`);
      if (!savedStartTime) {
        const startTime = Date.now();
        localStorage.setItem(`timerStartTime_${questions[0]._id}`, startTime.toString());
      }

      navigate('/questdetail', { state: { taskid: questions[0]._id, currentQuest: questions[0], userid: location.state.userid } });
    } else {
      console.log('no item left');
      navigate('/');
    }
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatTime(milliseconds) {
    let seconds = milliseconds;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

  const navigate = useNavigate();
  function backArrowClick() {
    navigate('/');
  }
  const skipQuest = e => {
    const { quests, userid } = location.state;
    localStorage.removeItem(`timerStartTime_${location.state.currentQuest._id}`);
    if (questIndex + 1 < quests?.length) {
      stopTimer(e);
      const startTime = Date.now();
      setStartTime(startTime);
      setQuestIndex(questIndex + 1);
      const nextQuest = quests[questIndex + 1];
      navigate('/questdetail', { state: { taskid: nextQuest._id, currentQuest: nextQuest, userid, quests } });
    }
  };
  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <div style={{ position: 'fixed', top: '40px', left: '30px' }}>
        <ArrowLeftIcon onClick={backArrowClick} className="bg-white border-black cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full" />
      </div>
      <h2 className=" text-3xl text-blue-300 border bg-white rounded-xl w-[30%] mx-auto font-semibold italic text-center p-4 m-4">
        {location.state.currentQuest.Quest}
      </h2>
      <div className="flex justify-center mt-8">
        <div class="row gap-12">
          {/* <img style={{ transform: 'scaleX(-1)' }} className="col w-24 h-24" src="warrior.png" alt="" /> */}

          <img className="col rounded-full h-24 w-24" src="monster.png" alt="" />
          <img className="col rounded-full h-24 w-24" src="warrior.png" alt="" />

        </div>
      </div>
      <div className="text-center mt-4 italic text-4xl"> {formatTime(elapsedTime)}</div>
      <div className="flex justify-center mt-8">
        <img onClick={leaveTask} className="w-20 h-20 bg-transparent rounded p-2  cursor-pointer " src="leave.jpg" alt="" />
        <img className="w-20 h-20 bg-transparent rounded p-2  cursor-pointer " src="hourglass.jpg" alt="" />
        <img onClick={e => completeTask(e)} className="w-20 h-20 bg-transparent rounded p-2  cursor-pointer " src="Sword.jpg" alt="" />
        <button onClick={e => skipQuest(e)} className="w-20 h-20 bg-blue-300 rounded-full p-3  cursor-pointer">
          <ForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default QuestDetail;
