const DISCORD_CLIENT_SECRET = "1Ea7GmMu62XmlJhZ8qSl-zCzg5ccfSFO";
const DISCORD_LOCAL_LINK =
  "https://discord.com/api/oauth2/authorize?client_id=1110861504535871568&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthenticating&response_type=code&scope=identify%20email";
const DISCORD_PROD_LINK =
  "https://discord.com/api/oauth2/authorize?client_id=1110861504535871568&redirect_uri=http%3A%2F%2F34.72.99.45%2Fauthenticating&response_type=code&scope=identify%20email";
const DISCORD_LOCAL_URI = "http://localhost:3000/authenticating";
const DISCORD_PROD_URI = "http://34.72.99.45/authenticating";
const ENV = "local";
const JWT_SECRET =
  "5f14a0f6e297f4a1f8d81932b4ebe57c0e3a5e5e36929c2670e888cfb8f7e203";

export {
  DISCORD_CLIENT_SECRET,
  DISCORD_LOCAL_URI,
  DISCORD_PROD_LINK,
  DISCORD_PROD_URI,
  DISCORD_LOCAL_LINK,
  ENV,
  JWT_SECRET,
};
