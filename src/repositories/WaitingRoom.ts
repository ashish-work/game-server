
import { DatabaseType } from "../models"
import { GameConstants } from "../constants/GameConstants"
export class WaitingRoomRepo {
    private _db: DatabaseType

    constructor(db:DatabaseType){
        this._db=db
    }

    public async create(){
        const payload = {
            slot_in_secs: GameConstants.WAITING_ROOM_TIMER_IN_SECS,
        }
        const waitingRoom = await this._db.WaitingRoom.create(payload)
    }

    public async findAll(){
        return await this._db.WaitingRoom.findAll()
    }

}