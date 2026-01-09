import crypto from "crypto"
import { CustomWebSocket, Room } from "../types"
import { getSender, rooms, users } from "../state";

export const handleCreateRoom = (ws: CustomWebSocket, roomName: string) => {
    const sender = getSender(ws);
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