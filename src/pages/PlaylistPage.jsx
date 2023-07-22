import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const PlaylistPage = () => {
  const navigate = useNavigate();
  function backArrowClick() {
    navigate('/');
  }

  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <div style={{ position: 'fixed', top: '40px', left: '30px' }}>
        <ArrowLeftIcon onClick={backArrowClick} className="bg-white border-black cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full" />
      </div>
      <h2 className=" text-3xl text-blue-300 border bg-white rounded-xl w-[30%] mx-auto font-semibold italic text-center p-4 m-4">Playlist</h2>
      <div className="flex justify-center mt-8">
        <div className="row gap-12 max-w-[400px] max-h-[75px]">
          {playlistData.map((playlist, index) => (
            <PlaylistItem key={index} {...playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlaylistItem = ({ name }) => (
  <div className="bg-gray-200 flex flex-col items-center justify-center h-full">
    <p className="m-0">{name}</p>
  </div>
);

const playlistData = [
  {
    name: 'Playlist name 1',
  },
  {
    name: 'Playlist name 2',
  },
  {
    name: 'Playlist name 3',
  },
  {
    name: 'Playlist name 4',
  },
];

export default PlaylistPage;
