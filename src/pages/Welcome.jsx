import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="flex justify-center lg:justify-start items-start h-screen">
        <div className="absolute inset-0  flex items-center justify-center">
          <img src="Logo.png" alt="Background" className="object-cover w-full h-full  " />
        </div>
        <div className="relative flex flex-col items-center z-10 text-center mt-16 lg:ml-20 lg:mt-16 xl:ml-28 xl:mt-20 ">
          <h3 className="text-4xl xl:text-[48px] font-bold italic">Welcome</h3>
          <h3 className="text-2xl xl:text-[48px] font-bold italic">to</h3>
          <h1 className="text-[64px] sm:text-8xl xl:text-[120px] font-bold italic">BetHero</h1>
          <h2 className="text-xl xl:text-[30px] italic  font-bold">(Prototype 0.1.1)</h2>
          <div className="mt-8"></div>
          <div className="mt-10">
            <button
              onClick={handleClick}
              className="w-[200px] xl:w-[500px] h-[64px] xl:h-[150px] flex justify-center items-center text-4xl xl:text-[80px] text-white italic font-bold px-6 py-3 bg-[#6282AE] hover:bg-[#7282AE] rounded-r-full rounded-l-full box-border"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
