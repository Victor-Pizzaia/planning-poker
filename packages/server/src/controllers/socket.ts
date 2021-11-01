import { Room } from "@planning/types";
import { Server } from "socket.io";

export function emit(
  io: Server,
  user: string,
  eventName: string,
  value: Room
): void {
  console.log(user);
  io.to(user).emit(eventName, value);
}
