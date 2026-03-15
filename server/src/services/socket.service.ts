import { Server } from "socket.io";

class SocketService {

    private io: Server | null = null;


    init(ioInstance: Server) {
        this.io = ioInstance;
    }


    emitToUser(userId: string, event: string, data: any) {
        if (this.io) {
            this.io.to(`user_${userId}`).emit(event, data);
        }
    }

}

export const socketService = new SocketService();