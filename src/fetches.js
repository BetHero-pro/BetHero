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
  console.log('URI IS ');
  console.log(URI);
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

const setOrder = async (updatedOrderData,userID) => {
  console.log(updatedOrderData);
  await fetch(URI + '/setOrder', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: updatedOrderData,userID:userID }),
    method: 'POST',
    mode: 'cors',
  }).then(response => {
    console.log(response.data);
  });
};

// store logs
const createLog = async (userid, name, state) => {
  console.log('creating a log');
  await fetch(URI + '/storeLogs', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userid: userid, name: name, state: state }),
    method: 'POST',
    mode: 'cors',
  }).then(response => {
    console.log(response.data);
  });
};

const fetchAllLogs = async (callback1, userID) => {
  await fetch(URI + '/fetchLogs', {
    body: JSON.stringify({ userid: userID }),
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
      const ndata = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(ndata);
      callback1(ndata);
    })
    .catch(err => {
      console.log(err);
    });
};

export {
  fetchAllQuests,
  fetchAllQuests1,
  createQuest,
  deleteQuest,
  markQuest,
  userAuth,
  setOrder,
  sendUserStatus,
  GetAllOnlineUsers,
  createLog,
  fetchAllLogs,
};
