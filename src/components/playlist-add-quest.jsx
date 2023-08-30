import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { NavbarAlternative } from '../ui/navbar';
import { useHotkeys } from 'react-hotkeys-hook';

const PlaylistAddQuest = ({ onSubmit, dispatch, disabledButton }) => {
  const [newQuestion, setNewQuestion] = useState('');
  useHotkeys('escape', () => dispatch({ type: 'SET_BOTH', isQuestion: false, disabledButton }));

  const insideSubmit = async e => {
    e.preventDefault();
    if (newQuestion !== '') {
      onSubmit({ newQuestion: newQuestion, status: true });
      setNewQuestion('');
    }
  };

  return (
    <NavbarAlternative title="A new journey, warrior">
      <form className="flex flex-col pt-12 justify-center items-center" onSubmit={insideSubmit}>
        <input
          className="w-[300px] rounded-lg h-20 text-center italic text-3xl"
          placeholder="Quest Name"
          autoFocus
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
        />
        <button disabled={disabledButton} type="submit" className="pt-12">
          <CheckIcon className="w-12 h-12 rounded-xl shadow-lg border-black border-2 shadow-slate-700 bg-green-300" />
        </button>
      </form>
    </NavbarAlternative>
  );
};

export default PlaylistAddQuest;
