// import {Model, ModelStatic, Sequelize} from "sequelize";
import {Sequelize} from 'sequelize-typescript';
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    models: [__dirname + '/**/*.model.ts'], // or [Player, Team],
  });

// const db:DatabaseType = {
//     sequelize: sequelize,
//     WaitingRoom: WaitingRoom Model,
//     GameRoom: GameRoomModel,
//     GameState: GameStateModel,
// }

