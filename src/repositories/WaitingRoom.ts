
import WaitingRoomModel from "../models/WaitingRoom.model"
import { GameConstants } from "../constants/GameConstants"
export class WaitingRoomRepo {

    public async create(){
        const payload = {
            slot_in_secs: GameConstants.WAITING_ROOM_TIMER_IN_SECS,
        }
        const waitingRoom = await WaitingRoomModel.create(payload)
    }

    public async findAll(){
        return await WaitingRoomModel.findAll()
    }

}