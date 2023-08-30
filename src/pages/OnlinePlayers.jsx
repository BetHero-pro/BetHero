import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { GetAllOnlineUsers } from '../fetches';
import { NavbarAlternative } from '../ui/navbar';

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
    <NavbarAlternative title="BetHero Pub">
      {onlineUsers.length === 0 ? (
        <div>Loading...</div>
      ) : (
        onlineUsers.map((user, index) => <PubItem key={index} userName={user.userName} avatarID={user.avatarID} />)
      )}
    </NavbarAlternative>
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
