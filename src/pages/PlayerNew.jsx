import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';

import { createQuest, getQuests, removeQuests } from '../config/api';
import { getUserId } from '../config/user';
import { createLog, markQuest } from '../fetches';

import { useDisabledCheckboxes } from '../hooks/useDisabledCheckboxes';
import { useFetchQuests } from '../hooks/useFetchQuests';

import { questReducer } from '../utils/lib';

import PlaylistAddQuest from '../components/playlist-add-quest';
import DragDropStoreDefault from '../components/drag-drop-store-default';

import { Navbar } from '../ui/navbar';
import { MenuButtons } from '../ui/menu-button';

function startTask(startTimeKey, navigate, list = null, userId = null) {
  const questions = list[0].items;
  const savedStartTime = localStorage.getItem(startTimeKey);

  if (!savedStartTime) {
    const startTime = Date.now();
    localStorage.setItem(startTimeKey, startTime.toString());
  }

  if (questions && questions.length > 0 && userId) {
    navigate('/questdetail', { state: { taskid: questions[0]._id, currentQuest: questions[0], userid: userId, quests: questions } });
  }
}

export default function PlayerNew() {
  const navigate = useNavigate();

  const userId = getUserId();

  // reducer (multiple state)
  const [state, dispatch] = useReducer(questReducer, { isQuestion: false, disabledButton: false });
  // use-state
  const [openLogs, setOpenLogs] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuests, setFilteredQuests] = useState([]);
  // hooks
  const { disableCheckbox, enableCheckbox, isCheckboxDisabled } = useDisabledCheckboxes();

  // get quests
  const [list, setList] = useFetchQuests(getQuests, { refetchFlag: refetch });

  // task
  const startFirstTask = () => startTask('timerStartTime_', navigate, list, userId);
  // hot-keys
  useHotkeys('q', () => setOpenLogs(false));
  useHotkeys('shift+enter', () => startFirstTask());
  useHotkeys('enter', () => dispatch({ type: 'SET_QUESTION', isQuestion: true }));
  // drag-n-drop function

  const handleAddQuest = async state => {
    dispatch({ type: 'SET_BOTH', isQuestion: state.isQuestion, disabledButton: true });
    await createQuest(userId, state.newQuestion, list[0].items.length + 1);
    await createLog(userId, state.newQuestion, 'created newQuest');
    setRefetch(!refetch);
    dispatch({ type: 'SET_BOTH', isQuestion: false, disabledButton: false });
  };

  const handleOnCheck = async (quest, e) => {
    disableCheckbox(quest._id);
    await markQuest(quest._id);
    setRefetch(!refetch);
    enableCheckbox(quest._id);
  };

  // quest name search input
  const handleSearchInputChange = e => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredItems = list[0].items.filter(item => item.Quest.toLowerCase().includes(query));
    let newList = JSON.parse(JSON.stringify(list));
    newList[0].items = filteredItems;
    setFilteredQuests(newList);
  };

  const allList = searchQuery === '' ? list : filteredQuests;

  const renderButtons = () => <MenuButtons openLogs={openLogs} setOpenLogs={setOpenLogs} dispatch={dispatch} startFirstTask={startFirstTask} />;

  return (
    <>
      {state.isQuestion ? (
        <PlaylistAddQuest onSubmit={handleAddQuest} dispatch={dispatch} disabledButton={state.disabledButton} />
      ) : (
        <>
          <div className="bg-blue-100">
            <Navbar handleSearchInputChange={handleSearchInputChange} />
            <div className="flex justify-center">
              <DragDropStoreDefault
                stores={allList}
                setStores={setList}
                Content={renderButtons}
                isCheckboxDisabled={isCheckboxDisabled}
                onCheck={handleOnCheck}
              />
            </div>
            <div className="flex justify-center">
              <button className='font-bold text-xl' onClick={() => removeQuests(userId)}>remove Quests</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
