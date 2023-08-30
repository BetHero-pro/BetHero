const DISCORD_CLIENT_SECRET = process.env.REACT_APP_DISCORD_CLIENT_SECRET ?? '';
const DISCORD_LOCAL_LINK = process.env.REACT_APP_DISCORD_LOCAL_LINK ?? '';
const DISCORD_PROD_LINK = process.env.REACT_APP_DISCORD_PROD_LINK ?? '';
const DISCORD_LOCAL_URI = process.env.REACT_APP_DISCORD_LOCAL_URI ?? '';
const DISCORD_PROD_URI = process.env.REACT_APP_DISCORD_PROD_URI ?? '';

const DEVMODE = process.env.NODE_ENV === 'development';
const ENV = process.env.REACT_APP_ENV ?? 'local';
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET ?? '';

export const URI = DEVMODE ? 'http://localhost:5000' : 'http://34.72.135.229';

export { DISCORD_CLIENT_SECRET, DISCORD_LOCAL_URI, DISCORD_PROD_LINK, DISCORD_PROD_URI, DISCORD_LOCAL_LINK, ENV, JWT_SECRET };
