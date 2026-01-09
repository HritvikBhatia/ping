import WebSocket from "ws"
import crypto from "crypto"
import { User } from "../types"
import { sockets, users } from "../state";

export const handleJoin = (ws: WebSocket, username: string) => {
    const socketId = crypto.randomUUID();
    
    (ws as any).socketId = socketId
    
    sockets.set(socketId, ws);

    
    const user : User = {
        id: crypto.randomUUID(),
        username: username,
        socketId
    }

    users.set(user.id, user);
    ws.send(JSON.stringify({
        type: "USER_JOIN",
        user
    }));

}