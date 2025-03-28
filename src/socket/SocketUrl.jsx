import { io } from "socket.io-client";
const socket = io("http://localhost:5400");
export default socket;