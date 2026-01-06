export type User = {
  id: string;
  username: string;
  socketId: string;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  roomId?: string;
  toUserId?: string;
  createdAt: number;
};

export type Room = {
  id: string;
  name: string;
  members: string[];
};

type ClientMessage =
  | { type: "JOIN"; username: string }
  | { type: "PRIVATE_MESSAGE"; toUserId: string; content: string }
  | { type: "GROUP_MESSAGE"; roomId: string; content: string }
  | { type: "CREATE_ROOM"; roomName: string }
  | { type: "JOIN_ROOM"; roomId: string };


type ServerMessage =
  | { type: "USER_LIST"; users: User[] }
  | { type: "MESSAGE"; message: Message }
  | { type: "ROOM_LIST"; rooms: Room[] }
  | { type: "ERROR"; message: string };

