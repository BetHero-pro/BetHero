import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
// import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { JWT_SECRET } from '../config/env';
// import Quest from "./Quest";
import { fetchAllQuests, createQuest, deleteQuest, setOrder } from '../fetches';

import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import Timer from '../components/TimerComponent';
import jwtDecode from 'jwt-decode';

const Player = ({ palyerName }) => {
  const jsonToken = localStorage.getItem('jwt');
  const [user, setUser] = useState({ username: '', userID: '' });
  const [newQuestion, setNewQuestion] = useState('');
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

  const handleClick = () => {
    setIsQuestion(1);
    setNewQuestion('');
  };

  const handlePlayer = async e => {
    e.preventDefault();
    if (newQuestion !== '') {
      setDisabledButton(true);
      await createQuest(user.userID, newQuestion);
      setDisabledButton(false);
      toggleRefresh(!refresh);
      setIsQuestion(0);
    }
  };

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

  useEffect(() => {
    if (jsonToken === '') {
      navigate('/welcome');
    } else if (user.userID !== '') {
      fetchAllQuests(setQuestions, setSelectedQuestions, user.userID);
    }
  }, [refresh]);

  // // get the avater url from local storage for now
  // const userpic = localStorage.getItem('avatarurl');

  // // get username from local storage for now
  // const username = localStorage.getItem('username');

  const [username, setUserName] = useState();
  const [avatarurl, setAvatarUrl] = useState();
  useEffect(() => {
    let userData = localStorage.getItem('jwt');
    if (userData) {
      userData = jwtDecode(userData);
      console.log(userData.data[0].userName);
      setUserName(userData.data[0].userName);
      setAvatarUrl(userData.data[0].userID);
    }
  }, []);

  // button to go to timer detail functionality
  function gotoQuestDetailBtn(e, currentQuest, index) {
    e.preventDefault();
    alert('im clicked ');
    console.log(currentQuest, index);
    navigate('/questdetail', { state: { index: index, currentQuest: currentQuest } });
  }

  return (
    <>
      <div className="">
        <div className="">
          <div className="my-1 mx-1 parent">
            {isQuestion ? (
              <form className="quest-form parent" onSubmit={handlePlayer}>
                <h1>Write Quest Name</h1>
                <div className="d-flex justify-content-center align-items-center middleDiv">
                  <input autoFocus value={newQuestion} onChange={e => setNewQuestion(e.target.value)} className="custom-input" />
                </div>

                <div className="child d-flex align-items-center justify-content-center py-5">
                  <button disabled={disabledButton} type="submit" className="btn-circle">
                    <i className="fa fa-check"></i>
                  </button>
                </div>
              </form>
            ) : (
              <form autoFocus className="quest-form parent">
                <div className=" text-center text-lg font-serif text-gray-700">
                  Hello,
                  <span className=" font-semibold ml-2  text-gray-950">{username ? username : 'please login guest'}</span>{' '}
                </div>
                <div className="p-2 ">
                  <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                      {provided => (
                        <div className="grid grid-cols-4 gap-4 p-4" {...provided.droppableProps} ref={provided.innerRef}>
                          {questions
                            .sort((a, b) => a.order - b.order)
                            .map((question, index) => (
                              <Draggable key={question._id} draggableId={question._id} index={index}>
                                {provided => (
                                  <div
                                    className="item-container rounded-lg shadow-sm bg-yellow-200 p-2 w-[200px] h-[200px]"
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                  >
                                    <div className="flex items-center justify-center">
                                      {/* <input
                          type="checkbox"
                          name={question}
                          disabled={false}
                          className="custom-check mr-2"
                          checked={isSelected(question)}
                          onChange={(e) => onChange(question, e)}
                          id={question._id}
                        /> */}
                                      <label className="fs-1 text-green-400 font-medium">{question.Quest}</label>
                                    </div>
                                    <div className="text-sm">
                                      <Timer taskId={question._id} />
                                    </div>
                                    <button
                                      onClick={e => gotoQuestDetailBtn(e, question, index)}
                                      className="mt-3 mb-4 ml-12 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded"
                                    >
                                      See Details
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
                <div className="child d-flex align-items-center justify-content-center py-5">
                  <button className="btn-circle" onClick={handleClick}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
