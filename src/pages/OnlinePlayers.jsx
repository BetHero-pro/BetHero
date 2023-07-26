import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { GetAllOnlineUsers } from '../fetches';
import { ArrowLeftComponent } from '../ui/navbar';

const OnlinePlayers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  //esc hotkey
  useHotkeys('esc', () => backArrowClick());

  const navigate = useNavigate();

  function backArrowClick() {
    navigate('/');
  }

  // fetch online users from backend
  useEffect(() => {
    GetAllOnlineUsers().then(data => {
      if (data !== undefined) {
        setOnlineUsers(data);
      }
    });
  }, []);

  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <ArrowLeftComponent />
      <div className="flex flex-col mt-8 items-center">
        <h1 className="text-4xl font-bold underline">BetHero Pub</h1>
        <div className="pt-8 gap-4 flex flex-col">
          {onlineUsers.length === 0 ? (
            <div>Loading...</div>
          ) : (
            onlineUsers.map((user, index) => <PubItem key={index} userName={user.userName} avatarID={user.avatarID} />)
          )}
        </div>
      </div>
    </div>
  );
};

const PubItem = ({ userName, avatarID }) => (
  <div className="flex items-center space-x-8">
    <img
      className="max-w-[75px]"
      alt={userName}
      src={avatarID}
      onError={e => {
        e.target.onerror = null;
        e.target.src = '/temp-image.png';
      }}
    />
    <div className="flex-1">
      <p>{userName}</p>
    </div>
  </div>
);

export default OnlinePlayers;
