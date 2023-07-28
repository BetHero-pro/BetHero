import { useEffect, useRef, useState } from 'react';

export const useYoutubePlayer = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  const initializePlayer = () => {
    if (!playerRef.current) {
      playerRef.current = new window.YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'jfKfPfyJRdk', // Replace with the YouTube video ID
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: event => {
            playerRef.current = event.target;
          },
        },
      });
    }
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const setVolume = volume => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  };

  const getVolume = () => {
    if (playerRef.current) {
      return playerRef.current.getVolume();
    }
  };

  return { togglePlayPause, isPlaying, setVolume, getVolume };
};