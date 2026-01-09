import WebSocket from "ws"
import crypto from "crypto"
import { Room } from "../types"
import { rooms, users } from "../state";

export const handleCreateRoom = (ws: WebSocket, roomName: string) => {
    const socketId = (ws as any).socketId;
    if (!socketId) return;
    
    const sender = [...users.values()].find(user => user.socketId === socketId)
    if (!sender) return;

    const room: Room = {
        id: crypto.randomUUID(),
        name: roomName,
        members: [sender.id]
    }

    rooms.set(room.id, room)

    ws.send(JSON.stringify({
        type: "ROOM_CREATED",
        room
    }));

}