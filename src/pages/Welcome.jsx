import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="flex justify-start items-start h-screen">
        <div className="absolute inset-0  flex items-center justify-center">
          <img src="Logo.png" alt="Background" className="object-cover w-full h-full  " />
        </div>
        <div className="relative z-10 text-center ml-16 mt-12 ">
          <h3 className="lg:text-4xl font-bold italic">Welcome</h3>
          <h3 className="lg:text-2xl font-bold italic">to</h3>
          <h1 className="lg:text-8xl font-bold italic">BetHero</h1>
          <h2 className="text-xl">(prototype version 0.1.1)</h2>
          <div className="mt-8"></div>
          <div className="mt-10">
            <button onClick={handleClick} className="px-6 py-3 w-[200px] lg:text-2xl bg-blue-300  text-white font-bold rounded-md hover:bg-blue-600">
              Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
