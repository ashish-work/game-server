import { Logger } from "../../utils/logger/Logger";
import { Server, Socket } from "socket.io";
import { GameConstants } from "../../constants/GameConstants";
import { GameRoomRepo } from "../../repositories/GameRoom";
import { Dealer } from "../Dealer";

const logger = Logger.getLoggerInstance()

export class RoomManager {
    private io: Server
    private gameRoomRepo: GameRoomRepo
    private dealer: Dealer

    constructor(io:Server, repo:GameRoomRepo, dealer: Dealer){
        this.io = io
        this.gameRoomRepo = repo
        this.dealer = dealer
    }

    async getRoom(roomId:string){
        return await this.gameRoomRepo.getRoom(roomId)
    }

    async joinRoom(socket: Socket, playerId:string){
        logger.info("joined room socket " + socket.id)
        socket.join(GameConstants.ROOM_ID)
        const gameDetails = await this.gameRoomRepo.joinPlayer(GameConstants.ROOM_ID, playerId)
        // this.io.to(GameConstants.ROOM_ID).emit("chat", "Hello World")
        const playersString = await this.gameRoomRepo.getPlayers(GameConstants.ROOM_ID)
        const players: string[] = playersString.split(",")
        socket.on('updateMove', (move:number) => {
            console.log('move number ', move)
            this.io.to(GameConstants.ROOM_ID).emit('move', move)
        })
        if(players.length >= 2){
            logger.info("Start Game")
            this.dealer.gameTimers(GameConstants.ROOM_ID)
            // this.dealer.listenEvents(GameConstants.ROOM_ID, socket)
            // this.io.to(GameConstants.ROOM_ID).emit("chat", gameDetails["gameStateId"])
        }
    }
}