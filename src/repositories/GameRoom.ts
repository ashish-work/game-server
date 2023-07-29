
import GameStateModel from "../models/GameState.model"
import GameRoomModel from "../models/GameRoom.model"
import { GameStateRepo } from "./GameState"

export class GameRoomRepo {
    private gameStateRepo: GameStateRepo

    constructor() {
        this.gameStateRepo = new GameStateRepo()
    }

    public async getRoom(roomId: string) {
        return await GameRoomModel.findOne({
            where:{
                roomId: roomId
            },
            include:[{ model: GameStateModel }]
        })
    }

    public async joinPlayer(roomId: string, playerId: string) {
        let room = await this.getRoom(roomId)
        let gameState = null
        if (!room) {
            room = await GameRoomModel.create({
                roomId: roomId
            })
            const currentTurn = playerId
            gameState = await this.gameStateRepo.create(playerId, currentTurn, room.id)
        } else {
            const roomDetails = room?.toJSON()
            gameState = await this.gameStateRepo.addPlayer(roomDetails.gameStateId.id, playerId)
            room = await room.reload()
        }
        return room?.toJSON()

    }

    public async findAll() {
        return await GameRoomModel.findAll()
    }

    public async getPlayers(roomId: string) {
        // TODO: Remove this hard coding of room id
        const gameRoom = await GameRoomModel.findByPk(1, { include: [{ model: GameStateModel }] })
        const gameRoomState = gameRoom?.toJSON()

        return gameRoomState['gameStateId']['players']
    }

}