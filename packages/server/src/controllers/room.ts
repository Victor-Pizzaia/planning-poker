import Cache from "../services/cache";
import { Room, User } from "@planning/types";

export async function getRoomFromCache(
  roomName: string,
  cache: Cache<Room>
): Promise<Room> {
  const value = await cache.get(roomName);
  return value;
}

export async function setRoomInCache(
  room: Room,
  cache: Cache<Room>
): Promise<Room> {
  const value = await cache.set(room.name, room);
  return value;
}

export async function createRoom(
  roomName: string,
  owner: User,
  cache: Cache<Room>
): Promise<Room> {
  if (cache.has(roomName)) {
    const room = await cache.get(roomName);
    if (!room.owner.id) {
      room.owner = owner;
      await setRoomInCache(room, cache);
      return Promise.resolve(room);
    }
    return Promise.reject(new Error("Sala já existe"));
  }

  const room = { name: roomName, owner };
  await setRoomInCache(room, cache);
  return Promise.resolve(room);
}

export function deleteRoomFromCahce(
  roomName: string,
  cache: Cache<Room>
): boolean {
  return cache.delete(roomName);
}

export function updateRoom<T>(room: Room, key: string, values: Array<T>): Room {
  return {
    ...room,
    [key]: [...values],
  };
}

export function getUserByUsername(room: Room, userName: string): Promise<User> {
  const user = room.users?.find((u) => u.name === userName);
  if (user) {
    return Promise.resolve(user);
  }
  return Promise.reject(
    new Error(`Usuário ${userName} não existe na sala ${room.name}`)
  );
}
