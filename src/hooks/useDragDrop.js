import { useCallback } from 'react';

const useDragDrop = (list, currentId, setList, apiFunc, setLoading) => {
  const move = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }, []);

  const moveItem = useCallback(
    async (startIndex, endIndex, id = null, direction = null) => {
      if (direction) {
        const questionIndex = list.findIndex(quest => quest._id === id);
        endIndex = direction === 'up' ? questionIndex - 1 : questionIndex + 1;
        startIndex = questionIndex;
      }

      if (endIndex >= 0 && endIndex < list.length) {
        const newList = move(list, startIndex, endIndex);
        setList(newList);
        setLoading(true);
        try {
          await apiFunc(currentId, newList);
        } catch (error) {
          console.log(error);
          // handle error, and revert state if necessary
        } finally {
          setLoading(false);
        }
      }
    },
    [list, currentId, setList, apiFunc, move, setLoading],
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
