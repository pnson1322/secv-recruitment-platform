import { io, Socket } from "socket.io-client";

const sockets: Record<string, Socket> = {};
const socketTokens: Record<string, string> = {};

export function connectSocket(token: string, namespace = "") {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const connectionUrl = namespace ? `${wsUrl.replace(/\/$/, "")}${namespace}` : wsUrl;
  const key = namespace || "default";

  if (sockets[key] && sockets[key].connected && socketTokens[key] === token) {
    return sockets[key];
  }

  if (sockets[key] && socketTokens[key] !== token) {
    sockets[key].disconnect();
    delete sockets[key];
    delete socketTokens[key];
  }

  if (!sockets[key]) {
    sockets[key] = io(connectionUrl, {
      transports: ["websocket"],
      auth: {
        token: `Bearer ${token}`,
      },
    });

    socketTokens[key] = token;
  }

  return sockets[key];
}

export function getSocket(namespace = "") {
  const key = namespace || "default";
  return sockets[key] || null;
}

export function disconnectSocket(namespace = "") {
  const key = namespace || "default";
  if (!sockets[key]) return;

  sockets[key].disconnect();
  delete sockets[key];
  delete socketTokens[key];
}
