import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div className="d-flex flex-col align-items-center">
          <div className="">
            <h1 className="font-title">Welcome to BetHero</h1>
            <h2>(prototype version 0.1)</h2>
            <div className="d-flex justify-content-center">
              <img width="50%" height="50%" src="Logo.png" />
            </div>
            <div className="d-flex justify-content-center pt-5">
              <button
                className="btn btn-secondary custom-btn"
                onClick={handleClick}
              >
                <span className="fs-4">Enter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
