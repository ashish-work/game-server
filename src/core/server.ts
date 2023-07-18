var express = require('express');

import {Express} from 'express'

import * as ServerConfig from '../../config/ServerConfig.json';
import { InitializeMiddleware } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';

export async function server() {
    let app: Express = express();

    let host = ServerConfig.host
    let port = ServerConfig.port

    let link = "http://" + host + ":" + port.toString()
    
    await InitializeMiddleware.InitalizeCommonMiddleware(app)
    await InitializeRoutes.Initialize(app, link)
    await InitializeMiddleware.InitializeErrorHandlingMiddleware(app)

    app.listen(port, host, () => {
        console.log(`Server started lisening at ${host} on ${port} port.`)
    })
}
