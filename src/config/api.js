import { URI } from './env';

const fetchAPI = async (url, method, body, params) => {
  let fullURL = `${URI}/${url}`;

  if (params && Object.keys(params).length > 0) {
    const urlParams = new URLSearchParams(params);
    fullURL = `${fullURL}?${urlParams}`;
  }

  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET' && method !== 'HEAD') {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(fullURL, fetchOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// INFO: single Playlist
export const createQuestInPlaylist = async (userID, playlistName, questText) => {
  return await fetchAPI('storePlaylistQuest', 'POST', { userID, playlistName, Quest: questText });
};

export const markPlaylistQuest = async (playlistID, questID) => {
  return await fetchAPI('markPlaylistQuest', 'POST', { playlistID, questID });
};

export const updatePlaylistQuests = async (playlistID, quests) => {
  return await fetchAPI('updatePlaylistQuests', 'POST', { playlistID, quests });
};

export const markPlaylist = async (userID, playlistID) => {
  return await fetchAPI('markPlaylist', 'POST', { userID, playlistID });
};

// INFO: playlists
export const updatePlaylists = async (userID, playlists) => {
  return await fetchAPI('updatePlaylists', 'POST', { userID, playlists });
};

export const fetchPlaylists = async (userID, playlistName) => {
  return await fetchAPI('getPlaylist', 'POST', { userID, playlistName });
};

export const getAllPlaylists = async userID => {
  return await fetchAPI(`playlists/${userID}`, 'GET', null);
};

export const storePlaylist = async (userID, playlistItem) => {
  return await fetchAPI('storePlaylist', 'POST', { userID, playlist: playlistItem });
};

export const deletePlaylists = async userID => {
  return await fetchAPI('deletePlaylists', 'POST', { userID });
};

export const deleteSpecificPlaylist = async (userID, playlistID) => {
  return await fetchAPI(`playlists/${userID}/${playlistID}`, 'DELETE');
};

// QUEST.

export const getQuests = async userID => {
  return await fetchAPI('quests', 'POST', { userID });
};

export const createQuest = async (userID, questName, index) => {
  console.log('list idx', index);
  return await fetchAPI('quests/create', 'POST', { userID, questName, index });
};

export const orderQuests = async (userID, updatedQuests) => {
  return await fetchAPI('quests/orderQuests', 'POST', { userID, updatedQuests });
};

export const markQuest = async questID => {
  return await fetchAPI('quests/markQuest', 'POST', { questID });
};

export const removeQuests = async userID => {
  return await fetchAPI('quests/removeQuests', 'DELETE', { userID });
};
