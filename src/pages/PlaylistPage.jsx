import { useEffect, useState } from 'react';
import { NavbarPage } from '../ui/navbar';
import { useNavigate } from 'react-router-dom';

const PlaylistPage = () => {
  const [playlistData, setPlaylistData] = useState(JSON.parse(localStorage.getItem('playlists')) || []);

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlistData));
  }, [playlistData]);

  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    setPlaylistData([
      ...playlistData,
      {
        name: newPlaylistName,
        quests: [],
      },
    ]);

    // Clear form inputs
    setNewPlaylistName('');
  };

  const resetPlaylists = () => {
    const playlists = [
      {
        name: 'Playlist name 1',
        quests: [
          {
            _id: '1',
            Quest: 'Quest name 1',
          },
          {
            _id: '2',
            Quest: 'Quest name 2',
          },
          {
            _id: '3',
            Quest: 'Quest name 3',
          },
        ],
      },
      {
        name: 'Playlist name 2',
        quests: [],
      },
    ];

    setPlaylistData(playlists);
  };

  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <NavbarPage title="Playlist" />
      <div className="flex justify-center mt-8">
        <div className="row gap-12 max-w-[400px]">
          {playlistData.map((playlist, index) => (
            <PlaylistItem key={index} {...playlist} />
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
            <div className="mb-5"></div>
            <button
              type="submit"
              className='className="text-white italic font-bold px-6 py-3 text-white bg-[#6282AE] hover:bg-[#7282AE] rounded-r-full rounded-l-full box-border"'
            >
              Submit new playlist
            </button>
          </form>
          <button onClick={resetPlaylists}>Reset localStorage Playlist</button>
        </div>
      </div>
    </div>
  );
};

const PlaylistItem = state => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/playlistmainpage', { state: { playlist: state } })}
      className="bg-gray-200 flex flex-col items-center justify-center"
    >
      <p className="m-0">{state?.name}</p>
    </div>
  );
};

export default PlaylistPage;
