import WebSocket from "ws"
import { sockets, users } from "../state"
import { Message } from "../types";
export const handlePrivateMessage = (ws: WebSocket, toUserId: string, content: string) => {
    
    const receiver = users.get(toUserId);
    if (!receiver) return;

    const receiverSocket = sockets.get(receiver.socketId);
    if (!receiverSocket) return;
    
    const socketId = (ws as any).socketId;
    if (!socketId) return;
    
    const sender = [...users.values()].find(user => user.socketId === socketId)
    if (!sender) return;
    
    const message: Message = {
        id: crypto.randomUUID(),
        senderId: sender.id,
        toUserId,
        content,
        createdAt: Date.now()
    };

    receiverSocket.send(JSON.stringify({ type: "MESSAGE", message }));

}