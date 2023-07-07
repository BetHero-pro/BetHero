import { useState } from 'react';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
const AddQuest = ({ onSubmit }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const handlePlayer = async e => {
    e.preventDefault();
    if (newQuestion !== '') {
      onSubmit(newQuestion);
      setNewQuestion('');
    }
  };

  const navigate = useNavigate();
  function backArrowClick() {
    navigate('/');
  }

  return (
    <form className="flex flex-col align-middle  bg-blue-200 w-screen h-screen text-bold" onSubmit={handlePlayer}>
      <div className="flex pt-3  items-center">
        <ArrowLeftIcon
          onClick={backArrowClick}
          className=" bg-white  border-black   cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full "
        />
        <h1 className=" mx-auto items-center  flex flex-col">
          A new journey ,<span className=" text-center font-bold capitalize italic text-4xl">warrior</span>
        </h1>
      </div>
      <div className="flex flex-col pt-12 justify-center items-center">
        <input
          className="w-[300px] rounded-lg h-20 text-center italic text-3xl"
          placeholder="Quest Name"
          autoFocus
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
        />

        <button type="submit" className="pt-12">
          <CheckIcon className="w-12 h-12 rounded-xl shadow-lg border-black border-2 shadow-slate-700 bg-green-300" />
        </button>
      </div>
    </form>
  );
};

export default AddQuest;
