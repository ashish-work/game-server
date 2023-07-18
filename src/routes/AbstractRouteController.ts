import express = require("express")
import {Logger} from "../utils/logger/Logger"

const logger:Logger = Logger.getLoggerInstance()

export abstract class AbstractRouteController {
    router = express.Router();
    path!: string;

    public async InitializeController(link: string) {
        logger.info(link + this.path)

        await this.InitializeGet()
        await this.InitializePost()
    }

    public async runService(req: express.Request, resp: express.Response): Promise<any> {
        resp.send('runService method for ' + this.path + 'does not exists !')
    }

    public async InitializeGet(){
        this.router.get(this.path, this.runService.bind(this)).bind(this)
    }

    public async InitializePost(){
        this.router.post(this.path, this.runService.bind(this)).bind(this)
    }
}