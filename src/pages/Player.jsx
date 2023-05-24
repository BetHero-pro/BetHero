import React, { useEffect } from "react";
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import axios from "axios";
import Quest from "./Quest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Player = ({ palyerName }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isQuestion, setIsQuestion] = useState(false);

  const isSelected = (question) => {
    return selectedQuestions.includes(question);
  };

  const onChange = (question) => {
    if (!isSelected(question)) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((_question) => _question !== question)
      );
    }
  };

  const handleClick = () => {
    setIsQuestion(1);
    setNewQuestion("");
  };

  const handlePlayer = () => {
    setIsQuestion(0);
    setQuestions([...questions, newQuestion]);
  };
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  useEffect(() => {
    if (username == null) {
      navigate("/welcome");
    } else {
      console.log(username);
    }
  }, []);
  return (
    <>
      <div class="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div class="d-flex flex-col justify-content-center">
          <div className="my-1 mx-1 parent">
            {isQuestion ? (
              <>
                <h1>Write Quest Name</h1>
                <div class="d-flex justify-content-center align-items-center middleDiv">
                  <input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    class="custom-input"
                  />
                </div>
                <div className="child d-flex align-items-center justify-content-center py-5">
                  <button className="btn-circle" onClick={handlePlayer}>
                    <i class="fa fa-check"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1>{`Hi (${username})`}</h1>
                <div>
                  {questions.map((question, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="checkbox"
                        name={question}
                        className="custom-check"
                        checked={isSelected(question)}
                        onChange={() => onChange(question)}
                      />
                      <label className="px-5 fs-1">{question}</label>
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
