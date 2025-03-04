import { io } from "socket.io-client";
import { backDomain } from "../../Resources/UniversalComponents";

const socket = io(backDomain, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

export const registerUser = (studentID) => {
  socket.emit("register", studentID);
};

export default socket;
