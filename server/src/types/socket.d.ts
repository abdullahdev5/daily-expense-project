import { UserPayload } from "./user";

declare module 'socket.io' {
    interface Socket {
        user?: UserPayload;
    }
}