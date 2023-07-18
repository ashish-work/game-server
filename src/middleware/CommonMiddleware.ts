import {Express} from 'express';
import {Logger} from '../utils/logger/Logger';


let bodyParser = require('body-parser');
let cors = require('cors');

export class CommonMiddleware {
    app: Express

    constructor(_app: Express) {
        this.app = _app
    }

    public async useBodyParser(){
        this.app.use(bodyParser.json());
    }

    public async useURLencoded(){
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        )
    }

    public async useCors(){
        this.app.use(cors());
    }

    public async logRequests() {
        let logger = Logger.getLoggerInstance()
        this.app.use((req, res, done) => {
            const message = {
                req: req.query,
                url: req.originalUrl
            }
            logger.info(JSON.stringify(message));
            done();
        });
    }
}