import { useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';

import { createQuestInPlaylist, markPlaylistQuest, updatePlaylistQuests } from '../config/api';
import { getUserId } from '../config/user';

import { DragDropList } from '../components/drag-drop-list';

import useFetchPlaylists from '../hooks/useFetchPlaylists';
import { useDisabledCheckboxes } from '../hooks/useDisabledCheckboxes';

import { navigateTo, questReducer, startTask } from '../utils/lib';

import { Navbar } from '../ui/navbar';
import PlaylistAddQuest from '../components/playlist-add-quest';
import { MenuButtons } from '../ui/menu-button';

export default function PlaylistMainDataPage() {
  const navigateToPage = navigateTo(useNavigate());
  const location = useLocation();

  // reducer (multiple state)
  const [state, dispatch] = useReducer(questReducer, { isQuestion: false, disabledButton: false });
  // use-state
  const [openLogs, setOpenLogs] = useState(false);
  const [currentPlaylist, _] = useState(location.state.playlist);
  const [refetch, setRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuests, setFilteredQuests] = useState([]);
  // hooks
  const { disableCheckbox, enableCheckbox, isCheckboxDisabled } = useDisabledCheckboxes();

  // fetch specific playlist quests data
  const [list, setList] = useFetchPlaylists({ refetchFlag: refetch, currentPlaylistName: currentPlaylist.name });

  // task
  const startFirstTask = () => startTask('timerStartTime_', navigateToPage, navigateTo, list, { username: '', userID: '' });
  // hot-keys
  useHotkeys('q', () => setOpenLogs(false));
  useHotkeys('shift+enter', () => startFirstTask());
  useHotkeys('enter', () => dispatch({ type: 'SET_QUESTION', isQuestion: true }));
  // drag-n-drop function

  const handleAddQuest = async state => {
    dispatch({ type: 'SET_BOTH', isQuestion: state.isQuestion, disabledButton: true });
    await createQuestInPlaylist(getUserId(), currentPlaylist.name, state.newQuestion);
    setRefetch(!refetch);
    dispatch({ type: 'SET_BOTH', isQuestion: false, disabledButton: false });
  };

  const handleOnCheck = async (quest, e) => {
    disableCheckbox(quest._id);
    await markPlaylistQuest(currentPlaylist._id, quest._id);
    setRefetch(!refetch);
    enableCheckbox(quest._id);
  };

  const RenderButtons = () => <MenuButtons openLogs={openLogs} setOpenLogs={setOpenLogs} dispatch={dispatch} startFirstTask={startFirstTask} />;

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = list.filter((quest) =>
      quest.Quest.toLowerCase().includes(query)
    );
    setFilteredQuests(filtered);
  };
  const allList = (searchQuery === '' ? list : filteredQuests).sort((a, b) => a.order - b.order);

  return (
    <>
      {state.isQuestion ? (
        <PlaylistAddQuest onSubmit={handleAddQuest} dispatch={dispatch} disabledButton={state.disabledButton} />
      ) : (
        <>
          <div className="bg-blue-100 w-screen h-screen">
            <Navbar handleSearchInputChange={handleSearchInputChange} />
            <div>
              <DragDropList
                currentId={currentPlaylist._id}
                apiFunc={updatePlaylistQuests}
                list={allList}
                setList={setList}
                onCheck={handleOnCheck}
                isCheckboxDisabled={isCheckboxDisabled}
              />
            </div>
            <RenderButtons />
          </div>
        </>
      )}
    </>
  );
}
