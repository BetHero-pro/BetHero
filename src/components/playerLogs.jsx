import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { fetchAllLogs } from '../fetches';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PlayerLogs = ({ shouldOpen, userId }) => {
  const [logs, setLogs] = useState([]);
  const userData = useSelector(state => state.user);
  useEffect(() => {
    if (shouldOpen === true) {
      fetchAllLogs(setLogs, userId);
    }
  }, [shouldOpen, userId]);

  const timeAgo = startDate => {
    const currentTime = new Date().getTime();
    const startDateMs = new Date(startDate).getTime();
    const differenceMs = currentTime - startDateMs;
    const secondsAgo = Math.floor(differenceMs / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo}s ago`;
    } else if (secondsAgo < 3600) {
      return `${Math.floor(secondsAgo / 60)}m ago`;
    } else if (secondsAgo < 86400) {
      return `${Math.floor(secondsAgo / 3600)}h ago`;
    } else if (secondsAgo < 604800) {
      return `${Math.floor(secondsAgo / 86400)} days ago`;
    } else {
      return new Date(startDate).toLocaleDateString();
    }
  };

  function getImg(log) {
    switch (log.state) {
      case 'created newQuest':
        return 'playlist.png';
      case 'completed':
        return 'sword.jpg';
      case 'started':
        return 'monster.png';
      default:
        break;
    }
  }
  return (
    <BottomSheet open={shouldOpen} snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 10]}>
      <div className="mx-5">
        <div className="border-b-2 p-2 text-lg font-light border-black w-full">
          <h5>
            press <span className=" p-2 w-12 h-12  rounded-lg bg-gray-300 border border-gray-500">Q</span> to exit.
          </h5>
        </div>
      </div>
      <div>
        {logs.map((log, index) => {
          const username = userData.userName;
          const avatarurl = userData.avatarID;
          const timeAgoText = timeAgo(log.createdAt);
          const imgquest = getImg(log);
          return (
            <Fragment key={log._id}>
              <div className="px-4 pt-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <div className="flex items-center space-x-2">
                    <img className="w-12 h-12 rounded-full" src={avatarurl} alt="" />
                    <div className="font-bold">{username}</div>
                    <span>you </span>
                    <span>{log.state}</span>
                    <span className={log.state == 'created newQuest' ? 'text-blue-600' : 'text-black'}>{` ${log.Name}`}</span>
                    <div className="text-green-500">{timeAgoText}</div>
                    <div className="flex w-10 h-10">
                      <img src={imgquest} alt="" />
                      <img className={log.state !== 'started' ? 'hidden' : ''} src="warrior.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </BottomSheet>
  );
};

export default PlayerLogs;
