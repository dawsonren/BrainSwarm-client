import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object

const URL = 'https://squid-app-cojgk.ondigitalocean.app:4000';

export const socket = io(URL);