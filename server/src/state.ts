import { User, Room, Message } from "./types";

export const users = new Map<string, User>();
export const rooms = new Map<string, Room>();
export const messages: Message[] = [];