import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DISCORD_CLIENT_SECRET,
  ENV,
  DISCORD_LOCAL_URI,
  DISCORD_PROD_URI,
} from "../secrets";
import {userAuth} from "../fetches";

export default function Intermediate() {
  const isAuthenticating = localStorage.getItem("authenticating");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticating === "true") {
      const client_secret = DISCORD_CLIENT_SECRET;
      const redirect_uri =
        ENV === "local" ? DISCORD_LOCAL_URI : DISCORD_PROD_URI;
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      axios
        .post(
          "https://discord.com/api/oauth2/token",
          {
            client_id: "1110861504535871568",
            client_secret: client_secret,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirect_uri,
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
              const userID = res.data.id;
              token = userAuth(username)
              console.log(token)
              console.log(token.token)
              localStorage.setItem("username", username);
              localStorage.setItem("userID", userID);
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
