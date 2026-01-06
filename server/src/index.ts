import { WebSocketServer } from "ws";
import { handleMessage, handleDisconnect } from "./handlers";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => handleMessage(ws, data));
  ws.on("close", () => handleDisconnect(ws));
});

console.log("WebSocket server running on ws://localhost:8080");
