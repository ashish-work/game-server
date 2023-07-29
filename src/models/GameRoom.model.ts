import GameStateModel from "./GameState.model";
import { Table, Column, Model, HasOne, PrimaryKey } from 'sequelize-typescript';

@Table
class GameRoomModel extends Model {
    @Column
    roomId!:string

    @HasOne(()=> GameStateModel)
    gameStateId!: number;
}

export default GameRoomModel