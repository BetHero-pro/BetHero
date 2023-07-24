import { URI } from './config/env.js';

const fetchAllQuests = (callback1, callback2, userID) => {
  fetch(URI + '/fetchQuest', {
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
      const questions = data.filter(item => item.isChecked !== true);
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
const fetchAllQuests1 = userID => {
  return new Promise((resolve, reject) => {
    fetch(URI + '/fetchQuest', {
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
        const questions = data.filter(item => item.isChecked !== true);
        console.log('data from fetch1 is');
        console.log(data);
        console.log('after sorting this data is');
        console.log(questions);

        resolve({ data: questions, result: true });
      })
      .catch(err => {
        console.log(err);
        resolve({ data: err, result: false });
      });
  });
};
const userAuth = async userObject => {
  console.log(userObject);

  //TODO 'CHANGE THE API URL TO PROD'

  await fetch(URI + '/userAuth', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName: userObject.userName, discordID: userObject.discordID, avatarID: userObject.avatarID }),
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

const sendUserStatus = async (userName, userID, avatarID, action) => {
  return;
  await fetch(URI + '/ActiveUsers', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uname: userName, userID: userID, avatarID: avatarID, action: action }),
    method: 'POST',
    mode: 'cors',
  }).then(response => {
    console.log(response.data);
  });
};

const GetAllOnlineUsers = async () => {
  return fetch(URI + '/getActiveUsers', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
      return data.userLis;
    });
};

const createQuest = async (userID, questText) => {
  await fetch(URI + '/storeQuest', {
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
  await fetch(URI + '/deleteQuest', {
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
  await fetch(URI + '/markQuest', {
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
  return;
  console.log(updatedOrderData);
  await fetch(URI + '/setOrder', {
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

export { fetchAllQuests, fetchAllQuests1, createQuest, deleteQuest, markQuest, userAuth, setOrder, sendUserStatus, GetAllOnlineUsers };
