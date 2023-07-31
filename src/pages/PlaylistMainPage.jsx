import { useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';

import { createQuestInPlaylist, markPlaylistQuest, updatePlaylistQuests } from '../config/api';
import { getUserId } from '../config/user';

import { DragDropList } from '../components/drag-drop-list';
import PlayerLogs from '../components/playerLogs';

import useFetchPlaylists from '../hooks/useFetchPlaylists';
import { useDisabledCheckboxes } from '../hooks/useDisabledCheckboxes';
import useDragDrop from '../hooks/useDragDrop';

import { navigateTo, playlistMainReducer, startTask } from '../utils/lib';

import { Navbar } from '../ui/navbar';
import { AddButton, IconButton, LogsIconButton, PlayButton } from '../ui/button';
import PlaylistAddQuest from '../components/playlist-add-quest';

export default function PlaylistMainDataPage() {
  const navigate = useNavigate();
  const navigateToPage = navigateTo(useNavigate());
  const location = useLocation();

  // reducer (multiple state)
  const [state, dispatch] = useReducer(playlistMainReducer, { isQuestion: false, disabledButton: false });

  // use-state
  const [openLogs, setOpenLogs] = useState(false);
  const [currentPlaylist, _] = useState(location.state.playlist);
  const [refetch, setRefetch] = useState(false);
  // hooks
  const [questions, setQuestions] = useFetchPlaylists(currentPlaylist.name, refetch);
  const { disableCheckbox, enableCheckbox, isCheckboxDisabled } = useDisabledCheckboxes();

  // task
  const startFirstTask = () => startTask('timerStartTime_', navigateToPage, navigateTo, questions, { username: '', userID: '' });
  // hot-keys
  useHotkeys('q', () => setOpenLogs(false));
  useHotkeys('shift+enter', () => startFirstTask());
  useHotkeys('enter', () => dispatch({ type: 'SET_QUESTION', isQuestion: true }));
  // drag-n-drop function
  const { handleDrop, moveQuestion } = useDragDrop(questions, currentPlaylist, setQuestions, updatePlaylistQuests);

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

  return (
    <>
      {state.isQuestion ? (
        <PlaylistAddQuest onSubmit={handleAddQuest} dispatch={dispatch} disabledButton={state.disabledButton} />
      ) : (
        <>
          <div className="bg-blue-100 w-screen h-screen">
            <Navbar />
            <div>
              <DragDropList
                questions={questions}
                handleDrop={handleDrop}
                moveQuestion={moveQuestion}
                onCheck={handleOnCheck}
                isCheckboxDisabled={isCheckboxDisabled}
              />
            </div>
            <div className="flex justify-center space-x-2">
              <LogsIconButton onClick={e => setOpenLogs(true)} />
              <PlayerLogs shouldOpen={openLogs} userId={''} />
              <IconButton onClick={() => navigate('/logpage')} imgSrc="/log.png" />
              <IconButton onClick={() => navigate('/playlistpage')} imgSrc="/playlist.png" className="bg-green-500 hover:bg-gray-500" />
              <IconButton onClick={() => navigate('/wanderingpage')} imgSrc="/wandering.png" />
              <IconButton onClick={() => navigate('/restpage')} imgSrc="/sleep.png" />
              <PlayButton onClick={startFirstTask} />
              <AddButton onClick={() => dispatch({ type: 'SET_QUESTION', isQuestion: true })} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
