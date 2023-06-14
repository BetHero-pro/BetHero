import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { isEmpty } from "../utils/validation";
import { JWT_SECRET } from "../config/env";

const useAuthentication = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [jwt, setJWT] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    if (isEmpty(jwt)) {
      setUser();
      navigate("/welcome");
    } else {
      const { data } = jwt.decode(jwt, JWT_SECRET);
      setUser({ username: data[0].userName, userID: data[0]._id });
      setJWT(localStorage.getItem("jwt"));
    }
  }, [jwt]);

  return user;
};

export default useAuthentication;
