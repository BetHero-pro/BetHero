import { useCallback } from 'react';

const useDragDrop = (questions, currentPlaylist, setQuestions, updatePlaylistQuests) => {
  const move = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }, []);

  const moveItem = useCallback(
    async (startIndex, endIndex, id = null, direction = null) => {
      if (direction) {
        const questionIndex = questions.findIndex(quest => quest._id === id);
        endIndex = direction === 'up' ? questionIndex - 1 : questionIndex + 1;
        startIndex = questionIndex;
      }

      if (endIndex >= 0 && endIndex < questions.length) {
        const newQuestions = move(questions, startIndex, endIndex);
        await updatePlaylistQuests(currentPlaylist._id, newQuestions);
        setQuestions(newQuestions);
      }
    },
    [questions, currentPlaylist, setQuestions, updatePlaylistQuests, move],
  );

  const handleDrop = useCallback(
    result => {
      const { destination, source } = result;

      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      moveItem(source.index, destination.index);
    },
    [moveItem],
  );

  const moveQuestion = useCallback(
    (id, direction) => {
      moveItem(null, null, id, direction);
    },
    [moveItem],
  );

  return { handleDrop, moveQuestion };
};

export default useDragDrop;
