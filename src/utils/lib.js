export function startTask(startTimeKey, navigateToPage, navigateTo, questions = null, user = null) {
  const savedStartTime = localStorage.getItem(startTimeKey);

  if (!savedStartTime) {
    const startTime = Date.now();
    localStorage.setItem(startTimeKey, startTime.toString());
  }

  if (questions && questions.length > 0 && user) {
    const taskId = questions[0]._id;
    navigateToPage(navigateTo, {
      taskid: taskId,
      currentQuest: questions[0],
      userid: user.userID,
      quests: questions,
    })();
    navigateToPage(navigateTo)();
  }
}

export const navigateTo =
  navigate =>
  (path, state = null) =>
  () => {
    navigate(path, { state });
  };

export const playlistMainReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTION':
      return { ...state, isQuestion: action.isQuestion };
    case 'SET_BOTH':
      return { ...state, isQuestion: action.isQuestion, disabledButton: action.disabledButton };
    default:
      throw new Error('Unhandled action type');
  }
};
