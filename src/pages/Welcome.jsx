import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div class="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div class="d-flex flex-col align-items-center">
          <div class="">
            <h1 class="font-title">Welcome to BetHero</h1>
            <h2>(prototype version 0.1)</h2>
            <div class="d-flex justify-content-center">
              <img width="50%" height="50%" src="Logo.png" />
            </div>
            <div class="d-flex justify-content-center pt-5">
              <button
                class="btn btn-secondary custom-btn"
                onClick={handleClick}
              >
                <span class="fs-4">Enter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
