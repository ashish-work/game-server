import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";


export class WaitingRoomModel {

    public model:ModelStatic<Model>
    private static instance: WaitingRoomModel
    public static modelName: string = "WaitingRoom"

    private constructor(sequilizer:Sequelize){
        this.model = sequilizer.define(WaitingRoomModel.modelName, {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            slot_in_secs: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        })
    }
    public static getModelInstance(sequilizer:Sequelize){
        if(!WaitingRoomModel.instance){
            WaitingRoomModel.instance = new WaitingRoomModel(sequilizer)
        }

        return WaitingRoomModel.instance
    }
}