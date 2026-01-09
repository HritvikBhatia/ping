import { User, Room, Message } from "./types";
import WebSocket from "ws";

export const users = new Map<string, User>();
export const sockets = new Map<string, WebSocket>();
export const rooms = new Map<string, Room>();
export const messages: Message[] = [];