const DISCORD_CLIENT_SECRET = "1Ea7GmMu62XmlJhZ8qSl-zCzg5ccfSFO";
const DISCORD_LOCAL_LINK =
  "https://discord.com/api/oauth2/authorize?client_id=1110861504535871568&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthenticating&response_type=code&scope=identify%20email";
const DISCORD_PROD_LINK =
  "https://discord.com/api/oauth2/authorize?client_id=1110861504535871568&redirect_uri=https%3A%2F%2Fbet.smhm-doo.com%2Fauthenticating&response_type=code&scope=identify%20email";
const DISCORD_LOCAL_URI = "http://localhost:3000/authenticating";
const DISCORD_PROD_URI = "https://bet.smhm-doo.com/authenticating";
const ENV = "prod";

export {
  DISCORD_CLIENT_SECRET,
  DISCORD_LOCAL_URI,
  DISCORD_PROD_LINK,
  DISCORD_PROD_URI,
  DISCORD_LOCAL_LINK,
  ENV,
};
