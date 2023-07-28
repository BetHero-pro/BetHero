import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import useLocalStorageWithExpiry from '../hooks/useLocalStorageWithExpiry';
import './coin.css';
import BetTimer from './TimerBetComponent';

function handleRemoveBetLocalStorage() {
  localStorage.removeItem('betTimer');
  localStorage.removeItem('betCoin');
  localStorage.removeItem('questCompleteNum');
}

const CoinBar = () => {
  const [betState, setBetState] = useState('');
  // get localStorage
  const [betCoin] = useLocalStorageWithExpiry('betCoin', null);
  const currentCompletedQuests = parseInt(localStorage.getItem('questCompleteNum'));

  // if currentCompletedQuests is same as betCoin
  if (currentCompletedQuests === betCoin) {
    handleRemoveBetLocalStorage();
    setBetState('win');
  }

  // check if timer is out
  if (localStorage.getItem('betTimer') !== null) {
    const elapsedTime = Math.floor((Date.now() - parseInt(localStorage.getItem('betTimer'))) / 1000);
    if (elapsedTime > 86400) {
      setBetState('lost');
      handleRemoveBetLocalStorage();
    }
  }

  if (betState === 'win') return <div>Bet Complete</div>;
  if (betState === 'lost') return <div>Bet Lost</div>;

  return (
    <div className="flex space-x-4 items-center text-center justify-center">
      <BetScore />
      <form id="coinbar-component">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-[200px] h-5"
          defaultValue={[currentCompletedQuests ? currentCompletedQuests : 0]}
          max={betCoin ?? 5}
          step={1}
          disabled
        >
          <Slider.Track className="bg-gray-500 relative grow rounded-full h-[10px] ">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-yellow-200 shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
            aria-label="Volume"
          />
        </Slider.Root>
      </form>
      <BetTimer />
    </div>
  );
};

const BetScore = () => {
  const currentCompletedQuests = parseInt(localStorage.getItem('questCompleteNum'));
  const [betCoin] = useLocalStorageWithExpiry('betCoin', null);

  // if betCoin is null
  if (betCoin === null) return;

  return <div>{currentCompletedQuests} / {betCoin}</div>;
}

export default CoinBar;
