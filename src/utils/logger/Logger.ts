import winston from 'winston';
import {options} from '../../../config/LoggerConfig.json'

export class Logger {
    private logger: winston.Logger
    private static instance: Logger

    private constructor(){
        this.logger = winston.createLogger({
            transports:[
                new winston.transports.Console(options.console), new winston.transports.File(options.file)
            ]
        })
    }

    public static getLoggerInstance(){
        if(!Logger.instance){
            Logger.instance = new Logger();
        }
        return Logger.instance
    }

    public info(msg: string) {
        this.logger.info(msg)
    }
}