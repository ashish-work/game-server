import { Server, Socket } from "socket.io";
import { RoomManager } from "../service-classes/RoomManager";
import { SocketEvents } from "../constants/SocketEvents";
import { Logger } from "../utils/logger/Logger";

const logger = Logger.getLoggerInstance()
export function InitializeSocket(io:Server) {
    logger.info('Initializing socket server')
    const roomManager = new RoomManager(io)

    io.on(SocketEvents.CONNECTION_EVENT,(socket:Socket) => {
        logger.info('A user connected')
        socket.on(SocketEvents.JOIN_ROOM_EVENT, ()=>{
            roomManager.joinRoom(socket)
        })
    })

}