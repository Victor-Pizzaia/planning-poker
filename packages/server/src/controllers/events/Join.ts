import { Room, User } from "@planning/types";
import Cache from "../../services/Cache";
import {
  createRoom,
  getRoomFromCache,
  setRoomInCache,
  updateRoom,
} from "../room";

export async function Join(
  userName: string,
  id: string,
  roomName: string,
  isOwner: boolean,
  cache: Cache<Room>
): Promise<Room> {
  const user: User = { id, name: userName };

  if (isOwner) {
    const room = await createRoom(roomName, user, cache);
    return Promise.resolve(room);
  }

  if (!cache.has(roomName)) {
    return Promise.reject(new Error(`A sala ${roomName} não existe`));
  }

  const room = await getRoomFromCache(roomName, cache);
  const users = [...(room.users || []), user];
  const updatedRoom = updateRoom(room, "users", users);
  await setRoomInCache(updatedRoom, cache);
  return Promise.resolve(updatedRoom);
}
