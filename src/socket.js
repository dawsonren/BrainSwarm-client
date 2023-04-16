import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// process.env.NODE_ENV === 'production'
const URL = true ? 'https://squid-app-cojgk.ondigitalocean.app:4000' : 'http://localhost:4000';

export const socket = io(URL);