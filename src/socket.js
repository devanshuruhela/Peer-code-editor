const { io } = require("socket.io-client");

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    forceNew:true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    secure:true,
    transports: ["websocket" ,  "polling"],
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
