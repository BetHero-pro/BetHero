import { useYoutubePlayer } from '../hooks/useYoutubePlayer';

export const MusicPlayer = () => {
  const { togglePlayPause, setVolume } = useYoutubePlayer();

  const handleVolumeChange = e => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  /* const handleGetVolume = () => {
    alert(`The current volume is: ${getVolume()}`);
  }; */

  return (
    <div>
      <div id="youtube-hidden">
        <div id="player" style={{ display: 'none' }}>
          ssz
        </div>
        <script src="https://www.youtube.com/iframe_api"></script>
      </div>
      <div className="flex flex-col items-center">
        <button onClick={togglePlayPause}>
          <img className="w-20 h-20 rounded-full p-3" src="music.png" alt="" />
        </button>
        <input type="range" min="0" max="100" onChange={handleVolumeChange} />
        {/* <button onClick={handleGetVolume}>Get Current Volume</button> */}
      </div>
    </div>
  );
};
