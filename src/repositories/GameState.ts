
import GameStateModel  from "../models/GameState.model"

export class GameStateRepo {

    public async create(playerId:string, currentTurn: string, roomId: number){
        if(!playerId){
            throw new Error("Missing requried number of players")
        }

        if(!currentTurn){
            throw new Error("Current turn not configured")
        }
        const payload = {
            players: playerId,
            currentTurn: currentTurn,
            move: 0,
            gameRoomId: roomId
        }
        const gameState = await GameStateModel.create(payload)
        gameState.set
        return gameState
    }

    public async getGameState(id: number){
        return await GameStateModel.findByPk(id)
    }


    public async addPlayer(gameId:number, playerId:string){
        const gameState = await this.getGameState(gameId)
        const players = gameState?.players
        const newPlayers = players + ',' + playerId
        return await GameStateModel.update({
            players: newPlayers
        }, {where:{id: gameId}})
    }

    public async findAll(){
        return await GameStateModel.findAll()
    }

    public async updateTurn(gameId: number, playerId: string){
        return await GameStateModel.update({
            currentTurn: playerId
        }, {where: {id: gameId}})
    }


}