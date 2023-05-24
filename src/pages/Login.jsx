import { useEffect } from "react";
import DiscordButton from "../components/DiscordButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_is_authenticating } from "../redux/authSlice";

const Login = () => {
  const isAuthenticated = localStorage.getItem("username") == null;
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("authenticating", "true");
    window.location.href =
      "https://discord.com/api/oauth2/authorize?client_id=1110861504535871568&redirect_uri=https%3A%2F%2Fbet-hero-phi.vercel.app%2Fauthenticating&response_type=code&scope=identify%20email";
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div class="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div class="d-flex flex-col align-items-center">
          <div class="">
            <h1 class="font-title">Login</h1>
            <div class="d-flex justify-content-center py-5 my-5">
              <DiscordButton handleClick={handleClick} isSSO={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
