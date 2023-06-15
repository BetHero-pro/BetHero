import axios from 'axios';
const fetchAllQuests = (callback1, callback2, userID) => {
  fetch('http://34.171.209.43:5000/fetchQuest', {
    body: JSON.stringify({ userID: userID }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const questions = data;
      console.log(questions);
      callback1(questions);
      callback2(
        questions.filter(question => {
          return question.isChecked;
        }),
      );
    })
    .catch(err => {
      console.log(err);
    });
};
const userAuth = async userName => {
  await fetch('http://34.171.209.43:5000/userAuth', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName: userName }),
    method: 'POST',
    mode: 'cors',
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      localStorage.setItem('jwt', data.token);
    })
    .catch(err => {
      console.log(err);
    });
};

const createQuest = async (userID, questText) => {
  await fetch('http://34.171.209.43:5000/storeQuest', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userID: userID, Quest: questText }),
    method: 'POST',
    mode: 'cors',
  }).then(response => {
    console.log(response.data);
  });
};
const deleteQuest = async questID => {
  await fetch('http://34.171.209.43:5000/deleteQuest', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questID: questID }),
    method: 'POST',
    mode: 'cors',
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};
const markQuest = async questID => {
  await fetch('http://34.171.209.43:5000/markQuest', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questID: questID }),
    method: 'POST',
    mode: 'cors',
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const setOrder = async updatedOrderData => {
  await fetch('http://34.171.209.43:5000/setOrder', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: updatedOrderData }),
    method: 'POST',
    mode: 'cors',
  }).then(response => {
    console.log(response.data);
  });
};

export { fetchAllQuests, createQuest, deleteQuest, markQuest, userAuth, setOrder };
