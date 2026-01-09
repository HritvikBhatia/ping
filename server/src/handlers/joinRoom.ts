import { getSender, rooms, users } from "../state";
import { CustomWebSocket } from "../types";
export const handleJoinRoom = (ws: CustomWebSocket, roomId: string) => {
    const sender = getSender(ws);
    if (!sender) return;

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