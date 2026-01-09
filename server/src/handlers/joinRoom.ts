import WebSocket from "ws"
import { rooms, users } from "../state";
export const handleJoinRoom = (ws : WebSocket, roomId: string) => {
    const socketId = (ws as any).socketId
    if(!socketId) return;

    const sender = [...users.values()].find(user => user.socketId == socketId);
    if(!sender) return;

    const room = rooms.get(roomId);
    
    if (!room) {
        ws.send(JSON.stringify({
            type: "ERROR",
            message: "Room not found"
        }));
        return;
    }

    if (!room.members.includes(sender.id)) {
        room.members.push(sender.id);
    }

    ws.send(JSON.stringify({
        type: "ROOM_JOINED",
        room
    }));
}