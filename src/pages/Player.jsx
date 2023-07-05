import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
// import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { JWT_SECRET } from '../config/env';
// import Quest from "./Quest";
import { fetchAllQuests, createQuest, deleteQuest, setOrder } from '../fetches';
import { PowerIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/outline';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import Timer from '../components/TimerComponent';
import jwtDecode from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData, getUserData } from '../redux_states/userState';
import AddQuest from '../components/addquest';
const Player = ({ palyerName }) => {
  const jsonToken = localStorage.getItem('jwt');
  const [user, setUser] = useState({ username: '', userID: '' });

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isQuestion, setIsQuestion] = useState(false);
  const [refresh, toggleRefresh] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [verification, setVerification] = useState(false);

  const isSelected = question => {
    return selectedQuestions.includes(question);
  };

  const onChange = async (question, e) => {
    e.target.disabled = true;
    await deleteQuest(question._id);
    toggleRefresh(!refresh);
    e.target.disabled = false;
  };

  // when new question is added
  useEffect(() => {
    if (jsonToken === '') {
      navigate('/welcome');
    } else if (user.userID !== '') {
      fetchAllQuests(setQuestions, setSelectedQuestions, user.userID);
    }
  }, [refresh]);

  // const handleClick = () => {
  //   setIsQuestion(1);
  //   setNewQuestion('');
  // };

  // const handlePlayer = async e => {
  //   e.preventDefault();
  //   if (newQuestion !== '') {
  //     setDisabledButton(true);
  //     await createQuest(user.userID, newQuestion);
  //     setDisabledButton(false);
  //     toggleRefresh(!refresh);
  //     setIsQuestion(0);
  //   }
  // };

  const handleDropprev = async droppedItem => {
    const destinationIndex = droppedItem.destination.index;
    const sourceIndex = droppedItem.source.index;

    let updatedQuestions = [...questions];
    const [reorderedQuestion] = updatedQuestions.splice(sourceIndex, 1);
    updatedQuestions.splice(destinationIndex, 0, reorderedQuestion);

    let updatedOrderData = [];
    updatedQuestions.forEach((question, index) => {
      question.order = index + 1;
      updatedOrderData.push({ questID: question._id, order: index + 1 });
    });

    setQuestions(updatedQuestions);
    console.log(updatedOrderData);
    await setOrder(updatedOrderData);
  };

  const handleDrop = async result => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedQuestions = Array.from(questions);

    // Remove the dragged item from the array
    const [removed] = updatedQuestions.splice(source.index, 1);

    // Insert the dragged item at the destination index
    updatedQuestions.splice(destination.index, 0, removed);

    let updatedOrderData = [];
    updatedQuestions.forEach((question, index) => {
      question.order = index + 1;
      updatedOrderData.push({ questID: question._id, order: index + 1 });
    });

    setQuestions(updatedQuestions);
    console.log(updatedOrderData);
    await setOrder(updatedOrderData);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (jsonToken === '') {
      navigate('/welcome');
    } else if (user.userID === '') {
      try {
        const { data } = jwt.decode(jsonToken, JWT_SECRET);
        setUser({ username: data[0].userName, userID: data[0]._id });
        setVerification(true);
        toggleRefresh(!refresh);
        document.addEventListener('keypress', e => {
          if (e.key === 'Enter' && isQuestion === 0) {
            setIsQuestion(1);
          }
        });
      } catch {
        localStorage.setItem('jwt', '');
        navigate('/welcome');
      }
    }
  }, []);

  // // get the avater url from local storage for now
  // const userpic = localStorage.getItem('avatarurl');

  // // get username from local storage for now
  // const username = localStorage.getItem('username');

  // redux code for managing user state
  const dispatch = useDispatch();

  // const [username, setUserName] = useState();
  // const [avatarurl, setAvatarUrl] = useState();
  const { username, avatarurl } = useSelector(state => state.user);
  useEffect(() => {
    let userData = localStorage.getItem('jwt');
    if (userData) {
      userData = jwtDecode(userData);
      console.log(userData.data[0].avatarID);
      // setUserName(userData.data[0].userName);
      // setAvatarUrl(userData.data[0].userID);
      dispatch(setUserData({ username: userData.data[0].userName, avatarurl: userData.data[0].avatarID }));
      dispatch(getUserData());
    }
  }, []);

  // button to go to timer detail functionality
  function gotoQuestDetailBtn(e, currentQuest, index) {
    e.preventDefault();
    alert('im clicked ');
    console.log(currentQuest, index);
    navigate('/questdetail', { state: { index: index, currentQuest: currentQuest } });
  }

  function backArrowClick() {
    navigate('/welcome');
  }

  const handleAddQuest = async newQuestion => {
    if (newQuestion !== '') {
      setDisabledButton(true);
      await createQuest(user.userID, newQuestion);
      setDisabledButton(false);
      toggleRefresh(!refresh);
      setIsQuestion(false);
    }
  };

  function startFirstTask() {
    if (questions.length > 0) {
      const savedStartTime = localStorage.getItem(`timerStartTime_${questions[0]._id}`);
      if (!savedStartTime) {
        const startTime = Date.now();
        localStorage.setItem(`timerStartTime_${questions[0]._id}`, startTime.toString());
      }

      navigate('/questdetail', { state: { taskid: questions[0]._id, currentQuest: questions[0] } });
    }
  }

  return (
    <>
      {isQuestion ? (
        <AddQuest onSubmit={handleAddQuest} />
      ) : (
        <>
          <div className="bg-blue-100 w-screen h-screen">
            <div className="flex justify-between pt-3   items-center">
              <PowerIcon
                onClick={backArrowClick}
                className=" bg-white border-black   cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full "
              />
              <div className="flex-grow flex justify-center space-x-2 items-center">
                <img className="w-12 h-12 rounded-full" src={avatarurl} alt="user" />
                <div className="text-center text-lg font-serif text-gray-700">
                  Hello,
                  <span className=" font-semibold ml-2  text-gray-950">{username ? username : 'please login guest'}</span>{' '}
                </div>
              </div>
              <div className="ml-auto mr-4">
                <button
                  className=" rounded-3xl p-3 text-white bg-blue-500"
                  onClick={() => {
                    setIsQuestion(true);
                  }}
                >
                  AddQuest
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-auto bg-white pt-4 flex flex-col mx-auto justify-start shadow-md rounded-2xl border-2 border-black items-center lg:w-[600px] h-[400px]">
                {questions.map((quest, index) => (
                  <div key={quest._id} className=" rounded-lg flex  items-center p-2 justify-between mb-2 w-full max-w-[95%] bg-orange-100">
                    <div className="flex items-center  space-x-2">
                      <input
                        type="checkbox"
                        name={quest}
                        disabled={false}
                        className=" mr-2 w-8 h-8 "
                        checked={isSelected(quest)}
                        onChange={e => onChange(quest, e)}
                        id={quest._id}
                      />
                      <label className="text-xl font-bold">{quest.Quest}</label>
                    </div>
                    <div className="flex  items-center ">
                      <ArrowRightOnRectangleIcon
                        onClick={e => gotoQuestDetailBtn(e, quest, index)}
                        className=" ml-8 rounded-2xl p-2 text-xs text-white w-8 h-8 bg-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <PlayIcon
                onClick={startFirstTask}
                className="w-12 h-12 bg-white cursor-pointer border border-black   rounded-full p-2 text-green-400"
              />

              <PlusIcon
                className=" bg-white cursor-pointer rounded-full border border-black w-12 h-12  text-black p-2 "
                onClick={() => {
                  setIsQuestion(true);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Player;
