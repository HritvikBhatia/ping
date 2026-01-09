import { getSender, sockets, users } from "../state"
import { CustomWebSocket, Message } from "../types";
export const handlePrivateMessage = (ws: CustomWebSocket, toUserId: string, content: string) => {
    
    const sender = getSender(ws);
    if (!sender) return;

    const receiver = users.get(toUserId);
    if (!receiver) return;

    const receiverSocket = sockets.get(receiver.socketId);
    if (!receiverSocket) return;
    
    
    const message: Message = {
        id: crypto.randomUUID(),
        senderId: sender.id,
        toUserId,
        content,
        createdAt: Date.now()
    };

    receiverSocket.send(JSON.stringify({ type: "MESSAGE", message }));

}