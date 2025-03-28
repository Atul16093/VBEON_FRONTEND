import { io } from "socket.io-client";
const socket = io("https://vbeon-backend.onrender.com");
export default socket;