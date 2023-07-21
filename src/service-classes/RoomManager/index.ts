import { Logger } from "../../utils/logger/Logger";
import { Server, Socket } from "socket.io";
import { GameConstants } from "../../constants/GameConstants";

const logger = Logger.getLoggerInstance()

export class RoomManager {
    private io: Server
    constructor(io:Server){
        this.io = io
    }

    joinRoom(socket: Socket){
        logger.info("joined room socket " + socket.id)
        socket.join(GameConstants.ROOM_ID)
        this.io.to(GameConstants.ROOM_ID).emit("chat", "Hello World")
    }
}