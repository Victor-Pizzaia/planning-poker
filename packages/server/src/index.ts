import { Room } from "@planning/types";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";
import Cache from "./services/Cache";
import router from "./services/Router";
import * as event from "./controllers/events/index";
import { emit } from "./controllers/socket";

const app = express();
app.use(express.static(path.join(__dirname, "client", "build")));

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const cache = new Cache<Room>();

io.on("connection", (socket: Socket) => {
  socket.on("join", async ({ userName, roomName, isOwner }) => {
    try {
      const room = await event.Join(
        userName,
        socket.id,
        roomName,
        isOwner,
        cache
      );
      console.log(room);
      emit(io, room.name, "updatedRoom", room);
    } catch (e) {
      socket.emit("error", (e as Error).message);
    }
  });
});

app.use(router);
server.listen(8000, () => console.log("Server running on port 8000"));
