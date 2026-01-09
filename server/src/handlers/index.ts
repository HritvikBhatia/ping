import WebSocket from "ws";
import { ClientMessage } from "../types";
import { handleJoin } from "./join";
import { handlePrivateMessage } from "./privateMessage";
import { handleCreateRoom } from "./createRoom";
import { handleJoinRoom } from "./joinRoom";
import { handleGroupMessage } from "./groupMessage";

export function handleMessage(ws: WebSocket, data: WebSocket.RawData){

    let msg : ClientMessage;

    try{
        msg = JSON.parse(data.toString());
    }catch{
        ws.send(JSON.stringify({ type: "ERROR", message: "Invalid JSON" }));
        return;
    }

    switch(msg.type){
        case "JOIN": {
            handleJoin(ws, msg.username);
            break;
        }
        case "PRIVATE_MESSAGE": {
            handlePrivateMessage(ws, msg.toUserId, msg.content)
            break;
        }
        case "GROUP_MESSAGE": {
            handleGroupMessage(ws, msg.roomId, msg.content);
            break;
        }
        case "CREATE_ROOM": {
            handleCreateRoom(ws, msg.roomName);
            break;
        }
        case "JOIN_ROOM": {
            handleJoinRoom(ws, msg.roomId);
            break;
        }
        default: {
            // const _exhaustive: never = msg;
            ws.send(JSON.stringify({ type: "ERROR", message: "Unknown message type" }));
        }
    }
}

export function handleDisconnect(ws : WebSocket){

}