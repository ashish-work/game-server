var Sequelize = require("sequelize");
import db from '../models'
import { Logger } from '../utils/logger/Logger';
const logger = Logger.getLoggerInstance()

export function IntializeDatabase(){
    db.sequelize.sync()
        .then(() => {
            logger.info("synced db")
        })
        .catch((err: { message: string; }) => {
            logger.info("Failed to sync db: " + err.message)
        })
}