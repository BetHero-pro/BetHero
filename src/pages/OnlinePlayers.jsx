import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { GetAllOnlineUsers } from '../fetches';

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
      <div style={{ position: 'fixed', top: '40px', left: '30px' }}>
        <ArrowLeftIcon onClick={backArrowClick} className="bg-white border-black cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full" />
      </div>
      <div className="flex flex-col mt-8 items-center">
        <h1 className="text-4xl font-bold underline">BetHero Pub</h1>
        <div className="flex justify-center mt-8">
          <div className="row gap-12 max-w-[400px] max-h-[75px]">
            {onlineUsers.length === 0 ? (
              <div>Loading...</div>
            ) : (
              onlineUsers.map((user, index) => <PubItem key={index} userName={user.userName} avatarID={user.avatarID} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PubItem = ({ userName, avatarID }) => (
  <div className="flex items-center space-x-8 justify-center">
    <img
      className="max-w-[75px]"
      alt={userName}
      src={avatarID}
      onError={e => {
        e.target.onerror = null;
        e.target.src = '/temp-image.jpg';
      }}
    />
    <div className="flex-1">
      <p>{userName}</p>
    </div>
  </div>
);

export default OnlinePlayers;
