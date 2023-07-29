import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { GameConstants } from '../constants/GameConstants';



@Table
class WaitingRoomModel extends Model {
    @Column({
        type:DataType.INTEGER,
        defaultValue: GameConstants.WAITING_ROOM_TIMER_IN_SECS
    })
    slotInSecs!:number
}


export default WaitingRoomModel

