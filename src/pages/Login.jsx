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
    // navigate("/authenticating");
    // window.location.href = redirect_link;
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div className="d-flex flex-col align-items-center">
          <div className="">
            <h1 className="font-title">Login</h1>
            <div className="d-flex justify-content-center py-5 my-5">
              <DiscordButton handleClick={handleClick} isSSO={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
