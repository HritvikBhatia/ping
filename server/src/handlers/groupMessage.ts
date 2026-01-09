import crypto from "crypto";
import { getSender, rooms, sockets, users } from "../state";
import { CustomWebSocket, Message } from "../types";

export const handleGroupMessage = (ws: CustomWebSocket, roomId: string, content: string) => {
  const sender = getSender(ws);
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
