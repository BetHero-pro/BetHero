import React, { useEffect } from "react";
import axios from "axios";
import { user_is_authenticated, getUsername } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Intermediate() {
  const isAuthenticating = localStorage.getItem("authenticating");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticating === "true") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      axios
        .post(
          "https://discord.com/api/oauth2/token",
          {
            client_id: "1110861504535871568",
            client_secret: "1Ea7GmMu62XmlJhZ8qSl-zCzg5ccfSFO",
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "https://bet-hero-phi.vercel.app/authenticating",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          const token = response.data.access_token;
          axios
            .get("https://discord.com/api/users/@me", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              const username = res.data.username;
              localStorage.setItem("username", username);
              localStorage.setItem("authenticating", "false");
              navigate("/");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/welcome");
    }
  }, []);

  return (
    <>
      <div class="d-flex justify-content-center margin-custom back-white reponsive-container">
        <div class="d-flex flex-col justify-content-center">
          <div className="my-1 mx-1 parent">
            <h1>Hold Still.</h1>
          </div>
        </div>
      </div>
    </>
  );
}
