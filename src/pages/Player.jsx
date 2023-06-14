import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
// import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { JWT_SECRET } from "../config/env";
// import Quest from "./Quest";
import {
  fetchAllQuests,
  createQuest,
  deleteQuest,
  // markQuest,
  // userAuth,
} from "../fetches";

import "../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";

const Player = ({ palyerName }) => {
  const jsonToken = localStorage.getItem("jwt");
  const [user, setUser] = useState({ username: "", userID: "" });
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isQuestion, setIsQuestion] = useState(false);
  const [refresh, toggleRefresh] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [verification, setVerification] = useState(false);

  const isSelected = (question) => {
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
    setNewQuestion("");
  };

  const handlePlayer = async (e) => {
    e.preventDefault();
    if (newQuestion !== "") {
      setDisabledButton(true);
      await createQuest(user.userID, newQuestion);
      setDisabledButton(false);
      toggleRefresh(!refresh);
      setIsQuestion(0);
    }
  };

  const handleDrop = (droppedItem) => {
    const destinationIndex = droppedItem.destination.index;
    const sourceIndex = droppedItem.source.index;

    const updatedQuestions = [...questions];
    const [reorderedQuestion] = updatedQuestions.splice(sourceIndex, 1);
    updatedQuestions.splice(destinationIndex, 0, reorderedQuestion);

    setQuestions(updatedQuestions);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (jsonToken === "") {
      navigate("/welcome");
    } else if (user.userID === "") {
      try {
        const { data } = jwt.decode(jsonToken, JWT_SECRET);
        setUser({ username: data[0].userName, userID: data[0]._id });
        setVerification(true);
        toggleRefresh(!refresh);
        document.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && isQuestion === 0) {
            setIsQuestion(1);
          }
        });
      } catch {
        localStorage.setItem("jwt", "");
        navigate("/welcome");
      }
    }
  }, []);

  useEffect(() => {
    if (jsonToken === "") {
      navigate("/welcome");
    } else if (user.userID !== "") {
      fetchAllQuests(setQuestions, setSelectedQuestions, user.userID);
    }
  }, [refresh]);

  return (
    <>
      <div className="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div className="d-flex flex-col justify-content-center">
          <div className="my-1 mx-1 parent">
            {isQuestion ? (
              <form className="quest-form parent" onSubmit={handlePlayer}>
                <h1>Write Quest Name</h1>
                <div className="d-flex justify-content-center align-items-center middleDiv">
                  <input
                    autoFocus
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="custom-input"
                  />
                </div>

                <div className="child d-flex align-items-center justify-content-center py-5">
                  <button
                    disabled={disabledButton}
                    type="submit"
                    className="btn-circle"
                  >
                    <i className="fa fa-check"></i>
                  </button>
                </div>
              </form>
            ) : (
              <form autoFocus className="quest-form parent">
                <h1>{`Hi ${user.username}`}</h1>
                <div>
                  <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                      {(provided) => (
                        <div
                          className="list-container"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {questions.map((question, index) => (
                            <Draggable
                              key={question._id}
                              draggableId={question._id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="item-container"
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                >
                                  {
                                    <>
                                      <input
                                        type="checkbox"
                                        name={question}
                                        disabled={false}
                                        className="custom-check"
                                        checked={isSelected(question)}
                                        onChange={(e) => onChange(question, e)}
                                        id={question._id}
                                      />
                                      <label className="px-5 fs-1">
                                        {question.Quest}
                                      </label>
                                    </>
                                  }
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
