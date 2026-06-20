// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import http from "http";
// import { Server } from "socket.io";

// import authRoutes from "./routes/authRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";

// import connectDB from "./config/db.js";

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/notifications", notificationRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "FoodWise API Running",
//   });
// });

// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {

//   console.log(
//     "User Connected:",
//     socket.id
//   );

//   socket.on(
//     "join",
//     (userId) => {

//       socket.join(userId);

//       console.log(
//         `User ${userId} joined room`
//       );
//     }
//   );

//   socket.on(
//     "disconnect",
//     () => {

//       console.log(
//         "User Disconnected"
//       );

//     }
//   );
// });

// const PORT =
//   process.env.PORT || 5000;

// server.listen(
//   PORT,
//   () => {
//     console.log(
//       `Server running at http://localhost:${PORT}`
//     );
//   }
// );

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://YOUR-FRONTEND-DOMAIN.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "FoodWise API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});