import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
    <form className="quest-form parent" onSubmit={handlePlayer}>
      <div className="flex">
        <ArrowLeftIcon
          onClick={backArrowClick}
          className=" bg-white  border-black   cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full "
        />
        <h1 className="ml-[400px]">Write Quest Name</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center middleDiv">
        <input autoFocus value={newQuestion} onChange={e => setNewQuestion(e.target.value)} className="custom-input" />
      </div>
      <div className="child d-flex align-items-center justify-content-center py-5">
        <button type="submit" className="btn-circle">
          <i className="fa fa-check"></i>
        </button>
      </div>
    </form>
  );
};

export default AddQuest;
