import axios from "axios";
const fetchAllQuests = (callback1, callback2, userID) => {
  fetch(
    "http://34.171.209.43/fetchQuest",
    {
      body: JSON.stringify({ userID: userID }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const questions = data;
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
  await fetch(
    "http://34.171.209.43/storeQuest",
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: userID, Quest: questText }),
      method: "POST",
      mode: "cors",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteQuest = async (questID) => {
  await fetch(
    "http://34.171.209.43/deleteQuest",
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questID: questID }),
      method: "POST",
      mode: "cors",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const markQuest = async (questID) => {
  await fetch(
    "http://34.171.209.43/markQuest",
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questID: questID }),
      method: "POST",
      mode: "cors",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { fetchAllQuests, createQuest, deleteQuest, markQuest };
