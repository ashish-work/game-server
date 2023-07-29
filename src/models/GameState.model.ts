import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import GameRoomModel from './GameRoom.model';

@Table
class GameStateModel extends Model {
    @Column
    players!:string

    @Column
    currentTurn!: string
    
    @Column
    currentMove!: number

    @ForeignKey(()=> GameRoomModel)
    gameRoomId!: string
}

export default GameStateModel