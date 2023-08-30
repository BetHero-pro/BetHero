import { useNavigate } from 'react-router-dom';
import PlayerLogs from '../components/playerLogs';
import { AddButton, IconButton, PlayButton } from './button';
import { getUserId } from '../config/user';

export const MenuButtons = ({ openLogs, setOpenLogs, dispatch, startFirstTask }) => {
  const navigate = useNavigate();
  const userId = getUserId();
  return (
    <div className="flex justify-center space-x-2">
      <PlayerLogs shouldOpen={openLogs} userId={userId} />
      <IconButton onClick={e => setOpenLogs(true)} imgSrc="/log.png" className="bg-white" />
      <IconButton onClick={() => navigate('/playlistpage')} imgSrc="/playlist.png" className="bg-white" />
      <IconButton onClick={() => navigate('/wanderingpage')} imgSrc="/wandering.png" className="bg-white" />
      <IconButton onClick={() => navigate('/restpage')} imgSrc="/sleep.png" className="bg-white" />
      <PlayButton onClick={startFirstTask} />
      <AddButton onClick={() => dispatch({ type: 'SET_QUESTION', isQuestion: true })} />
    </div>
  );
};
