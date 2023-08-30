import { useState } from 'react';

import { NavbarPage } from '../ui/navbar';
import { getUserId } from '../config/user';
import { storePlaylist, deletePlaylists, updatePlaylists, getAllPlaylists, deleteSpecificPlaylist } from '../config/api';
import { DragDropPlaylist } from '../components/drag-drop-playlist';
import useFetchPlaylistCustom from '../hooks/useFetchPlaylistCustom';

const PlaylistPage = () => {
  const userId = getUserId(); // Fetch the user ID once and store it in a variable

  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [refetch, setRefetch] = useState(false);

  // fetch playlists data
  const [list, setList] = useFetchPlaylistCustom(getAllPlaylists, { refetchFlag: refetch });

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
    await deletePlaylists(userId);
    setRefetch(!refetch);
  };

  const handleOnDelete = async playlist => {
    await deleteSpecificPlaylist(userId, playlist._id);
    setRefetch(!refetch);
  };

  return (
    <div className="bg-blue-200 h-full">
      <NavbarPage title="Playlist" />
      <div>
        <div className="p-6">
          <DragDropPlaylist
            type="playlist"
            currentId={userId}
            apiFunc={updatePlaylists}
            list={list}
            setList={setList}
            refetch={refetch}
            onCheck={handleOnDelete}
            isCheckboxDisabled={() => {}}
          />
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <input
                  className="rounded-lg text-center italic"
                  placeholder="Playlist Name"
                  autoFocus
                  value={newPlaylistName}
                  onChange={e => setNewPlaylistName(e.target.value)}
                />
                <button
                  type="submit"
                  className='className="text-white italic font-bold px-4 bg-[#6282AE] hover:bg-[#7282AE] rounded-r-full rounded-l-full box-border"'
                >
                  Create
                </button>
                <button onClick={resetPlaylists}>Reset localStorage Playlist</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* const PlaylistItem = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className="bg-gray-200 flex flex-col items-center justify-center">
      <p className="m-0">{name} </p>
    </div>
  );
}; */

export default PlaylistPage;
