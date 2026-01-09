import { User, Room, Message, CustomWebSocket } from "./types";
import WebSocket from "ws";

export const users = new Map<string, User>();
export const sockets = new Map<string, WebSocket>();
export const rooms = new Map<string, Room>();
export const messages: Message[] = [];

export const getSender = (ws: CustomWebSocket):User | null => {
    const socketId = ws.socketId;
    if (!socketId) return null;

    const sender = [...users.values()].find(user => user.socketId === socketId)
    if (!sender) return null;

    return sender
}