import { URI } from './env';

const fetchAPI = async (url, method, body) => {
  const response = await fetch(`${URI}/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const fetchPlaylists = async (userID, playlistName) => {
  return await fetchAPI('getPlaylist', 'POST', { userID, playlistName });
};

export const storePlaylist = async (userID, playlistItem) => {
  return await fetchAPI('storePlaylist', 'POST', { userID, playlist: playlistItem });
};

export const deletePlaylists = async userID => {
  return await fetchAPI('deletePlaylists', 'POST', { userID });
};

export const createQuestInPlaylist = async (userID, playlistName, questText) => {
  return await fetchAPI('storePlaylistQuest', 'POST', { userID, playlistName, Quest: questText });
};

export const markPlaylistQuest = async (playlistID, questID) => {
  return await fetchAPI('markPlaylistQuest', 'POST', { playlistID, questID });
};

export const updatePlaylistQuests = async (playlistID, quests) => {
  return await fetchAPI('updatePlaylistQuests', 'POST', { playlistID, quests });
};
