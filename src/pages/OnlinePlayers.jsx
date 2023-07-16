import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { ArrowLeftIcon} from '@heroicons/react/24/outline';
import { GetAllOnlineUsers } from '../fetches';

const OnlinePlayers = () => {

    //esc hotkey
    useHotkeys('esc', () => backArrowClick())
    
    const navigate = useNavigate();
    
    function backArrowClick() {
      navigate('/');
    }

    // fetch online users from backend
    useEffect(() =>{
        GetAllOnlineUsers()

    });

    return ( 

    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <div style={{ position: 'fixed', top: '40px', left: '30px' }}>
        <ArrowLeftIcon onClick={backArrowClick} className="bg-white border-black cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full" />
    </div>
      <div className="flex justify-center mt-8">
      </div>
    </div>
  );
};

export default OnlinePlayers;
