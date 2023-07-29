import {sequelize} from '../models'
import { Logger } from '../utils/logger/Logger';
const logger = Logger.getLoggerInstance()

export function IntializeDatabase(){
    sequelize.sync()
        .then(() => {
            logger.info("synced db")
        })
        .catch((err) => {
            console.log(err)
            logger.info("Failed to sync db: " + err.message)
        })
}