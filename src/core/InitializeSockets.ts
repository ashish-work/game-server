import { Server, Socket } from "socket.io";
import { RoomManager } from "../service-classes/RoomManager";
import { GameRoomRepo } from "../repositories/GameRoom";
import { SocketEvents } from "../constants/SocketEvents";
import { Logger } from "../utils/logger/Logger";
import { Dealer } from "../service-classes/Dealer";
import { GameStateRepo } from "../repositories/GameState";

const logger = Logger.getLoggerInstance()
export function InitializeSocket(io:Server) {
    logger.info('Initializing socket server')
    const gameRoomRepo = new GameRoomRepo()
    const gameStateRepo = new GameStateRepo()
    const dealer = new Dealer(io, gameRoomRepo, gameStateRepo )
    const roomManager = new RoomManager(io, gameRoomRepo, dealer)

    io.on(SocketEvents.CONNECTION_EVENT,(socket:Socket) => {
        logger.info('A user connected')
        socket.on(SocketEvents.JOIN_ROOM_EVENT, (playerId: string)=>{
            roomManager.joinRoom(socket, playerId)
        })
    })

}