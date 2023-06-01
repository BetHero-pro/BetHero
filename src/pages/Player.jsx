import React, { useEffect } from "react";
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import axios from "axios";
import Quest from "./Quest";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import {
  fetchAllQuests,
  createQuest,
  deleteQuest,
  markQuest,
  userAuth,
} from "../fetches";
import { JWT_SECRET } from "../secrets";

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
    setDisabledButton(true);
    await createQuest(user.userID, newQuestion);
    setDisabledButton(false);
    toggleRefresh(!refresh);
    setIsQuestion(0);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (jsonToken == "") {
      navigate("/welcome");
    } else if (user.userID == "") {
      try {
        const { data } = jwt.decode(jsonToken, JWT_SECRET);
        setUser({ username: data[0].userName, userID: data[0]._id });
        setVerification(true);
        toggleRefresh(!refresh);
      } catch {
        localStorage.setItem("jwt", "");
        navigate("/welcome");
      }
    }
  }, []);

  useEffect(() => {
    if (jsonToken == "") {
      navigate("/welcome");
    } else if (user.userID !== "") {
      fetchAllQuests(setQuestions, setSelectedQuestions, user.userID);
    }
  }, [refresh]);

  return (
    <>
      <div class="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div class="d-flex flex-col justify-content-center">
          <div className="my-1 mx-1 parent">
            {isQuestion ? (
              <form className="quest-form parent" onSubmit={handlePlayer}>
                <h1>Write Quest Name</h1>
                <div class="d-flex justify-content-center align-items-center middleDiv">
                  <input
                    autoFocus
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    class="custom-input"
                  />
                </div>

                <div className="child d-flex align-items-center justify-content-center py-5">
                  <button
                    disabled={disabledButton}
                    type="submit"
                    className="btn-circle"
                  >
                    <i class="fa fa-check"></i>
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1>{`Hi ${user.username}`}</h1>
                <div>
                  {questions?.map((question, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="checkbox"
                        name={question}
                        disabled={false}
                        className="custom-check"
                        checked={isSelected(question)}
                        onChange={(e) => onChange(question, e)}
                        id={question._id}
                      />
                      <label className="px-5 fs-1">{question.Quest}</label>
                      <br></br>
                    </React.Fragment>
                  ))}
                </div>
                <div className="child d-flex align-items-center justify-content-center py-5">
                  <button className="btn-circle" onClick={handleClick}>
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
