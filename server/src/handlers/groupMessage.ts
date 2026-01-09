import WebSocket from "ws";
import crypto from "crypto";
import { rooms, sockets, users } from "../state";
import { Message } from "../types";

export const handleGroupMessage = (ws: WebSocket, roomId: string, content: string) => {
  const socketId = (ws as any).socketId;
  if (!socketId) return;

  const sender = [...users.values()].find((user) => user.socketId == socketId);
  if (!sender) return;

  const room = rooms.get(roomId);

  if (!room) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        message: "Room not found",
      })
    );
    return;
  }

  const message: Message = {
    id: crypto.randomUUID(),
    senderId: sender.id,
    roomId,
    content,
    createdAt: Date.now(),
  };

  if (!room.members.includes(sender.id)) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        message: "You are not a member of this room",
      })
    );
    return;
  }

  for (const member of room.members) {
    const receiver = users.get(member);
    if (!receiver) continue;
    const receiverSocket = sockets.get(receiver.socketId);
    if (!receiverSocket) continue;

    receiverSocket.send(JSON.stringify({ type: "MESSAGE", message }));
  }
};
