// questSlice.js
import { createSlice } from '@reduxjs/toolkit';

const questSlice = createSlice({
  name: 'quest',
  initialState: {
    quests: [],
  },
  reducers: {
    setQuests: (state, action) => {
      state.quests = action.payload;
    },
    addQuest: (state, action) => {
      state.quests.push(action.payload);
    },
  },
});

export const { setQuests, addQuest } = questSlice.actions;
export default questSlice.reducer;
