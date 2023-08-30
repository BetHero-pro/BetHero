import { useEffect } from 'react';
import DiscordButton from '../components/DiscordButton';
import { useNavigate } from 'react-router-dom';
import { ENV, DISCORD_LOCAL_LINK, DISCORD_PROD_LINK } from '../config/env';

const Login = () => {
  const redirect_link = ENV === 'local' ? DISCORD_LOCAL_LINK : DISCORD_PROD_LINK;
  const isAuthenticated = localStorage.getItem('username') === null || localStorage.getItem('username') === '';
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem('authenticating', 'true');
    console.log('redirect_link:', redirect_link);
    navigate('/authenticating');
    window.location.href = redirect_link;
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <div className="flex-col mx-auto bg-white mt-[50px] w-[400px] h-[500px] text-center p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <div className="flex justify-center py-4 my-4">
          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mr-4">Sign Up</button>
          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md">Login</button>
        </div>
        <p className="border-2 mt-8"></p>
        <div className="flex justify-center py-2 my-2">
          <DiscordButton handleClick={handleClick} isSSO={true} />
        </div>
      </div>
    </>
  );
};

export default Login;
