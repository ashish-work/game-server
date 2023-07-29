import { AbstractRouteController } from "../AbstractRouteController";
import express = require("express")
import { WaitingRoomRepo } from "../../repositories/WaitingRoom";
import { StatusConstants } from "../../constants/StatusConstants";


export class WaitingRoomController extends AbstractRouteController {
    private waitingRoomRepo: WaitingRoomRepo
    constructor(link:string){
        super();
        this.path = '/waitingroom';
        this.InitializeController(link)
        this.waitingRoomRepo = new WaitingRoomRepo()
    }

    public init() {
        // A temporary method to create a room 
        this.waitingRoomRepo.create()
    }

    public async runService(req: express.Request, resp: express.Response): Promise<any> {
        if(req.method=="POST"){
            let response = await this.waitingRoomRepo.create()
            resp.status(StatusConstants.code200).send(response)
        }

        if(req.method == "GET") {
            let response = await this.waitingRoomRepo.findAll()
            resp.status(StatusConstants.code200).send(response)
        }
    }
}