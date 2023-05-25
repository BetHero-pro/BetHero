import axios from "axios";
const fetchAllQuests = (callback1, callback2, userID) => {
  axios
    .post(
      "https://betherobackend.jaydesale.repl.co/fetchQuest",
      { userID: userID },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      const questions = response.data;
      callback1(questions);
      callback2(
        questions.filter((question) => {
          return question.isChecked;
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
const createQuest = async (userID, questText) => {
  await axios
    .post(
      "https://betherobackend.jaydesale.repl.co/storeQuest",
      JSON.stringify({ userID: userID, Quest: questText }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteQuest = async (questID) => {
  await axios
    .post(
      "https://betherobackend.jaydesale.repl.co/deleteQuest",
      JSON.stringify({ questID: questID }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const markQuest = async (questID) => {
  await axios
    .post(
      "https://betherobackend.jaydesale.repl.co/markQuest",
      JSON.stringify({ questID: questID }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { fetchAllQuests, createQuest, deleteQuest, markQuest };
