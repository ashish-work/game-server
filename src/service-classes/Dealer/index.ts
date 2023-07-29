import { Server, Socket } from "socket.io";
import { GameStateRepo } from "../../repositories/GameState";
import { GameRoomRepo } from "../../repositories/GameRoom";

export class Dealer {
    private io: Server
    private gameRoomRepo: GameRoomRepo
    private gameStateRepo: GameStateRepo

    constructor(io:Server, repo:GameRoomRepo, gameStateRepo: GameStateRepo){
        this.io = io
        this.gameRoomRepo = repo
        this.gameStateRepo = gameStateRepo

    }

    async startGame(roomId:string){
        // TODO: Write logic for cleaning up socket connections
        const room = await this.gameRoomRepo.getRoom(roomId)
        const gameDetails = room?.toJSON()
        this.io.to(roomId).emit('init', gameDetails.gameStateId)
    }

    async updateTurn(self:Dealer,roomId:string) {
        const room = await self.gameRoomRepo.getRoom(roomId)
        const roomDetails = room?.toJSON()
        const playersString = await self.gameRoomRepo.getPlayers(roomId)
        const players: string[] = playersString.split(",")
        // TODO: the game state should be internal repo managed by game repo.
        // Update logic to use room Id to get the game state
        const gameState = roomDetails.gameStateId
        if(!gameState){
            throw new Error('Game state not present for id 1')
        }

        const currentTurn = gameState.currentTurn
        let updatedTurn = players.filter(playerId => currentTurn!=playerId)[0]
        self.gameStateRepo.updateTurn(gameState.id, updatedTurn)
        self.io.to(roomId).emit('updateTurn', updatedTurn)
    }

    async gameTimers(roomId:string){
        const self = this
        await this.startGame(roomId)
        const intervalId = setInterval(this.updateTurn, 10000, self, roomId)
        setTimeout(this.closeGame, 300000,self, roomId, intervalId)
    }


    listenEvents(roomId:string, socket:Socket){
        socket.on('updateMove', (move:number) => {
            console.log('move number ', move)
            this.io.to(roomId).emit('move', move)
        })
    }

    closeGame(self:Dealer, roomId:string, intervalId:number){
        console.log('close game')
        clearInterval(intervalId)
        self.io.to(roomId).emit('gameOver', 'Game Over')
    }

}