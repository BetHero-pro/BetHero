import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useLocalStorageWithExpiry from '../hooks/useLocalStorageWithExpiry';

const BetPage = () => {
  const [activeCoin, setActiveCoin] = useState(null);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setStoredCoin] = useLocalStorageWithExpiry('betCoin', null);

  function backArrowClick() {
    navigate('/');
  }

  const onClick = betValue => {
    setActiveCoin(betValue)
  };

  const onClickApprove = () => {
    // if no coin is selected, do nothing
    if (activeCoin === null) return;
    // set betCoin, completedQuest & betTimer in local storage & navigate to "/"
    setStoredCoin(activeCoin);
    localStorage.setItem("betTimer", Date.now());
    localStorage.setItem("questCompleteNum", 0);
    backArrowClick();
  }

  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      <div style={{ position: 'fixed', top: '40px', left: '30px' }}>
        <ArrowLeftIcon onClick={backArrowClick} className="bg-white border-black cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full" />
      </div>
      <h2 className=" text-3xl border bg-white rounded-xl w-[30%] mx-auto font-semibold text-center p-4 m-4">Bet</h2>
      <div className="flex flex-col mt-8 items-center">
        <h1 className="text-4xl font-bold underline">Raise the Bet on Yourself</h1>
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-3 gap-12">
            {tempCoinData.map((coin, index) => (
              <CoinItem key={coin.value} onClick={onClick} data={coin} activeCoin={activeCoin} />
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center gap-16">
        <button onClick={backArrowClick}><img className="w-28" src="image-bet-red-cross.png" alt="" /></button>
        <button onClick={onClickApprove}><img className={`w-28 ${activeCoin !== null ? 'hover:bg-green-300' : ''} `} src="image-bet.png" alt="" /></button>
        </div>
      </div>
    </div>
  );
};

const tempCoinData = [
  {
    title: '1 coin',
    value: 1,
  },
  {
    title: '3 coins',
    value: 3,
  },
  {
    title: '5 coins',
    value: 5,
  },
  {
    title: '10 coins',
    value: 10,
  },
  {
    title: '15 coins',
    value: 15,
  },
  {
    title: '25 coin',
    value: 25,
  },
];

const CoinItem = ({ onClick, activeCoin, data }) => (
  <div
    onClick={() => onClick(data.value)}
    className={`hover:cursor-pointer border-2 border-solid rounded-full items-center justify-center flex-col text-center item-center w-24 h-24 p-2 ${activeCoin === data.value ? 'border-green-300' : 'border-black hover:border-gray-500'}`}
  >
    <p className="m-0 font-bold">{data.title}</p>
    <img className="w-14 h-14 bg-transparent cursor-pointer ml-3" src="coin.png" alt="" />
  </div>
);

export default BetPage;
