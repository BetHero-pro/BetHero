import { useState, useEffect } from 'react';
import { fetchPlaylists } from '../config/api';
import { getUserId } from '../config/user';

export default function useFetchPlaylists(currentPlaylistName, refetchFlag) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await fetchPlaylists(getUserId(), currentPlaylistName);
        setQuestions(questions.quests);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refetchFlag, currentPlaylistName]);

  return [questions, setQuestions]; // return both the questions and the setter
}
