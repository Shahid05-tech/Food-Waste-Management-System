// import { io } from "socket.io-client";

// const socket = io(
//   import.meta.env.VITE_SOCKET_URL,
//   {
//     transports: ["websocket", "polling"],
//     withCredentials: true,
//   }
// );

// export default socket;

import { io } from "socket.io-client";

const socket = io(
  "https://food-waste-management-system-2-hhdl.onrender.com",
  {
    transports: ["websocket", "polling"],
    withCredentials: true,
  }
);

export default socket;