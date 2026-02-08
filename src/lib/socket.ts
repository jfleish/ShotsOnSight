import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io('/', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
  return socket;
}

export function joinSession(sessionId: string) {
  const s = getSocket();
  s.emit('join_session', sessionId);
}

export function leaveSession(sessionId: string) {
  const s = getSocket();
  s.emit('leave_session', sessionId);
}
