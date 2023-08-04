import { useState, useEffect } from 'react';
import { getUserId } from '../config/user';

export default function useFetchPlaylistCustom(fetchPlaylistsFunc, { refetchFlag, currentPlaylistName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPlaylistsFunc(getUserId(), currentPlaylistName);
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
  }, [refetchFlag, currentPlaylistName, fetchPlaylistsFunc]);

  return [data, setData];
}
