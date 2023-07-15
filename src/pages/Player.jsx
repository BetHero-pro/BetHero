import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
// import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { JWT_SECRET } from '../config/env';
// import Quest from "./Quest";
import { fetchAllQuests, createQuest, deleteQuest, setOrder, markQuest } from '../fetches';
import { PowerIcon, ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/outline';

import Timer from '../components/TimerComponent';
import jwtDecode from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData, getUserData } from '../redux_states/userState';
import AddQuest from '../components/addquest';
import { useHotkeys } from 'react-hotkeys-hook';

//icons
import { AiOutlineArrowDown as DownArrow } from 'react-icons/ai'
import StatusLight from '../components/playerStatus';

const Player = ({ palyerName }) => {
  const bottomOfDivQuests = useRef(null)

  const handleBottomScrollBtn = () => {
    bottomOfDivQuests?.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const jsonToken = localStorage.getItem('jwt');
  const [user, setUser] = useState({ username: '', userID: '' });

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isQuestion, setIsQuestion] = useState(false);
  const [refresh, toggleRefresh] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [verification, setVerification] = useState(false);

  useHotkeys('enter', () => setIsQuestion(true));

  const isSelected = question => {
    return selectedQuestions.includes(question);
  };

  const onChange = async (question, e) => {
    e.target.disabled = true;
    await markQuest(question._id);
    toggleRefresh(!refresh);
    e.target.disabled = false;
  };

  // when new question is added
  useEffect(() => {
    // if (jsonToken === '') {
    //   navigate('/welcome');
    // } else if (user.userID !== '') {
    //   fetchAllQuests(setQuestions, setSelectedQuestions, user.userID);
    // }
    fetchAllQuests(setQuestions, setSelectedQuestions, user.userID);

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
    console.log(currentQuest, index);
    navigate('/questdetail', { state: { index: index, currentQuest: currentQuest, userid: user.userID } });
  }

  function backArrowClick() {
    navigate('/welcome');
  }

  const handleAddQuest = async state => {
    if (state.status === true) {
      setDisabledButton(true);
      await createQuest(user.userID, state.newQuestion);
      setDisabledButton(false);
      toggleRefresh(!refresh);
      setIsQuestion(false);
    } else {
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

      navigate('/questdetail', { state: { taskid: questions[0]._id, currentQuest: questions[0], userid: user.userID, quests: questions } });
    }
  }

  function startRestTask() {

    const savedRestTime = localStorage.getItem('restTime');
    if (!savedRestTime) {
      const restTime = Date.now();
      localStorage.setItem('restTime', restTime.toString());
    }

    navigate('/restPage');

  }

  function startWanderingTask() {
    const savedWanderingTime = localStorage.getItem('wanderingTime');
    if (!savedWanderingTime) {
      const wanderingTime = Date.now();
      localStorage.setItem('wanderingTime', wanderingTime.toString());
    }

    navigate('/wanderingpage');
  }

  const [updateOrder, setUpdateOrder] = useState(false);
  const pushToEnd = async (element) => {
    console.log(element)
    const index = questions.findIndex(item => item._id === element);
    console.log(index)
    if (index > -1) {
      const lastQuestion = questions[questions.length - 1];
      console.log(lastQuestion)
      const updatedQuestions = [...questions]; // Create a shallow copy of the questions array
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        order: lastQuestion.order + 1,
      };
      setQuestions(updatedQuestions)
      setUpdateOrder(true)

    }
  }

  useEffect(() => {
    console.log("updating")
    let updatedOrderData = [];
    questions.forEach((question, index) => {
      question.order = index + 1;
      updatedOrderData.push({ questID: question._id, order: index + 1 });
    });
    setOrder(updatedOrderData);

  }, [updateOrder])


  const userinfo = [
    {
      id: 1, name: 'John', userStatus: {
        play: false,
        rest: true,
        wandering: false,
      }
    }];

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

              <div className=" lg:w-[400px] mx-auto rounded-lg    flex flex-col items-center">
                <div className="   flex justify-center space-x-2 items-center ">
                  <img className="  w-12 h-12 rounded-full" src={avatarurl} alt="user" />
                  <div className="text-center  text-lg font-serif text-gray-700">
                    Hello,
                    <span className=" font-semibold ml-2  text-gray-950">{username ? username : 'please login guest'}</span>{' '}
                  </div>
                </div>
                <div className="">
                  <StatusLight status={userinfo[0].userStatus} />
                </div>
              </div>
              <div className=" mr-4">
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

            <div>

              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                  {provided => (
                    <div className="p-6">

                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="overflow-auto bg-white pt-4 flex flex-col mx-auto justify-start shadow-md rounded-2xl border-2 border-black items-center lg:w-[600px] h-[400px]"
                      >
                        <button onClick={handleBottomScrollBtn} className='flex fixed top-[80px] ml-[550px]  bg-white p-2 rounded-full border-black shadow-lg border-2 hover:transform hover:scale-110 transition duration-500'><DownArrow size={20} /></button>
                        {questions
                          .sort((a, b) => a.order - b.order)
                          .map((quest, index) => (
                            <Draggable key={quest._id} draggableId={quest._id} index={index}>
                              {provided => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  className=" rounded-lg flex  items-center p-2 justify-between mb-2 w-full max-w-[95%] bg-orange-100"
                                >

                                  <div className='flex items-center  space-x-2'>
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

                                  <div className="group inline-block relative">
                                    <ArrowSmallDownIcon
                                      onClick={(e) => { pushToEnd(quest._id) }}
                                      className='w-8 h-8  bg-white border-2 border-black  p-1 rounded-full ' onClick={(e) => pushToEnd(quest._id)} />
                                    <div className="hidden group-hover:block group-hover:cursor-pointer bg-white cursor-pointer text-black py-2 px-4 z-50 rounded absolute right-12 border-2  ">
                                      Move me to the end
                                    </div>
                                  </div>
                                </div>

                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                        <div ref={bottomOfDivQuests} />
                      </div>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="flex justify-center space-x-2">
              <button className='w-13 h-13 cursor-pointer border border-black rounded-full bg-white' onClick={startWanderingTask}><img src="/wandering.png" className='w-10 h-10 p-2' /></button>
              <button className='w-13 h-13 cursor-pointer border border-black rounded-full bg-white' onClick={startRestTask}><img src="/sleep.png" className='w-10 h-10 p-2' /></button>
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
      )
      }
    </>
  );
};

export default Player;
