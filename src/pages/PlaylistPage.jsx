import { useState, useEffect } from 'react';
import { NavbarPage } from '../ui/navbar';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../config/user';
import { fetchPlaylists, storePlaylist, deletePlaylists } from '../config/api';

const PlaylistPage = () => {
  const [playlistData, setPlaylistData] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  const userId = getUserId(); // Fetch the user ID once and store it in a variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlists = await fetchPlaylists(getUserId());
        setPlaylistData(playlists);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refetch]);

  const handleSubmit = async e => {
    e.preventDefault();

    const playlistItem = {
      name: newPlaylistName,
      quests: [],
    };

    try {
      await storePlaylist(userId, playlistItem);
      setRefetch(!refetch);
    } catch (error) {
      console.log(error);
    }

    setNewPlaylistName('');
  };

  const resetPlaylists = async () => {
    try {
      await deletePlaylists(userId);
      setRefetch(!refetch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <NavbarPage title="Playlist" />
      <div className="flex justify-center mt-8">
        <div className="row gap-12 max-w-[400px]">
          {playlistData.map((playlist, index) => (
            <PlaylistItem key={index} {...playlist} onClick={() => navigate('/playlistmainpage', { state: { playlist: playlist } })} />
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

const PlaylistItem = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className="bg-gray-200 flex flex-col items-center justify-center">
      <p className="m-0">{name} </p>
    </div>
  );
};

export default PlaylistPage;
