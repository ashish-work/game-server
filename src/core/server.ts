var express = require('express');
import { Server } from "socket.io";

const http = require("http")

import {Express} from 'express'

import * as ServerConfig from '../../config/ServerConfig.json';
import { InitializeMiddleware } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';
import { InitializeSocket } from './InitializeSockets';
import {IntializeDatabase} from './InitializeDatabase'

export async function server() {
    let app: Express = express();
    let host = ServerConfig.host
    let port = ServerConfig.port

    let link = "http://" + host + ":" + port.toString()
    
    await InitializeMiddleware.InitalizeCommonMiddleware(app)
    await InitializeRoutes.Initialize(app, link)
    await InitializeMiddleware.InitializeErrorHandlingMiddleware(app)

    IntializeDatabase()

    const httpServer = http.createServer(app)

    httpServer.listen(port, host, () => {
        let io = new Server(httpServer);
        console.log(`Server started lisening at ${host} on ${port} port.`)
        InitializeSocket(io)
    })
}
