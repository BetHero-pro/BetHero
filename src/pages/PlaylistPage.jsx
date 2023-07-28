import { getUserId } from '../config/user';
import { createLog, createQuest } from '../fetches';
import { useState } from 'react';
import { NavbarPage } from '../ui/navbar';

const PlaylistPage = () => {
  const onClick = quests => {
    if (quests.length === 0) return;
    // get auth with user
    const userId = getUserId();

    // perform create quests from playlist
    quests.map(async quest => {
      await createQuest(userId, quest.name);
      await createLog(userId, quest.name, 'newQuest');
    });
  };

  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [quests, setQuests] = useState([{ name: '' }]);
  const [playlistData, setPlaylistData] = useState([
    {
      name: 'Playlist name 1',
      quests: [
        {
          name: 'Quest name 1',
        },
        {
          name: 'Quest name 2',
        },
        {
          name: 'Quest name 3',
        },
      ],
    },
    {
      name: 'Playlist name 2',
      quests: [],
    },
  ]);

  const addInput = event => {
    event.preventDefault();
    setQuests([...quests, { name: '' }]);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...quests];
    list[index].name = value;
    setQuests(list);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setPlaylistData([
      ...playlistData,
      {
        name: newPlaylistName,
        quests,
      },
    ]);

    // Clear form inputs
    setNewPlaylistName('');
    setQuests([{ name: '' }]);
  };

  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <NavbarPage title="Playlist" />
      <div className="flex justify-center mt-8">
        <div className="row gap-12 max-w-[400px]">
          {playlistData.map((playlist, index) => (
            <PlaylistItem key={index} onClick={onClick} {...playlist} />
          ))}
          <form onSubmit={handleSubmit}>
            <p>Create Playlist Item</p>
            <label>playlist name</label>
            <input
              className="w-[300px] rounded-lg h-8 text-center italic text-xl"
              placeholder="Playlist Name"
              autoFocus
              value={newPlaylistName}
              onChange={e => setNewPlaylistName(e.target.value)}
            />

            {quests.map((quest, index) => {
              return (
                <div key={index}>
                  <label>quest name</label>

                  <input
                    className="w-[300px] rounded-lg h-8 text-center italic text-xl"
                    placeholder="Quest Name"
                    autoFocus
                    value={quest.name}
                    onChange={e => handleInputChange(e, index)}
                  />
                </div>
              );
            })}
            <button onClick={addInput}>Add another quest</button>
            <div className="mb-5"></div>
            <button
              type="submit"
              className='className="text-white italic font-bold px-6 py-3 text-white bg-[#6282AE] hover:bg-[#7282AE] rounded-r-full rounded-l-full box-border"'
            >
              Submit new playlist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const PlaylistItem = ({ name, quests, onClick }) => (
  <div onClick={() => onClick(quests)} className="bg-gray-200 flex flex-col items-center justify-center">
    <p className="m-0">{name}</p>
    {quests &&
      quests.map((quest, index) => (
        <div className="flex w-full flex-row" key={index}>
          <span>{quest.name}</span>
        </div>
      ))}
  </div>
);

export default PlaylistPage;
