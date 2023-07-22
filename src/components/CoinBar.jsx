import * as Slider from '@radix-ui/react-slider';

import './coin.css';

const CoinBar = () => {
  // get localStorage
  const betCoin = localStorage.getItem('betCoin');
  const currentCompletedQuests = parseInt(localStorage.getItem('questCompleteNum'));
  return (
    <form id="coinbar-component">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-[200px] h-5"
        defaultValue={[currentCompletedQuests ?? 0]}
        max={betCoin ?? 5}
        step={1}
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
  );
};

export default CoinBar;
