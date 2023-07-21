import {Model, ModelStatic, Sequelize} from "sequelize";
const sequelize = new Sequelize("sqlite::memory:");
import {WaitingRoomModel} from "./WaitingRoom.model"

export type DatabaseType = {
    sequelize: Sequelize,
    WaitingRoom: ModelStatic<Model>
}

const db:DatabaseType = {
    sequelize: sequelize,
    WaitingRoom: WaitingRoomModel.getModelInstance(sequelize).model
}

export default db