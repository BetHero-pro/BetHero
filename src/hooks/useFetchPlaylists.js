import { useState, useEffect } from 'react';
import { fetchPlaylists } from '../config/api';
import { getUserId } from '../config/user';

export default function useFetchPlaylists({ refetchFlag, currentPlaylistName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPlaylists(getUserId(), currentPlaylistName);
        if (currentPlaylistName) {
          setData(response.quests);
        } else {
          setData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refetchFlag, currentPlaylistName]);

  return [data, setData];
}
