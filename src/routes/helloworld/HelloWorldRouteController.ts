import { AbstractRouteController } from "../AbstractRouteController";
import {Response, Request} from 'express';
import { HelloWorld } from "../../service-classes/helloworld/HelloWorld";
import { StatusConstants } from "../../constants/StatusConstants";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class HelloWorldController extends AbstractRouteController {
    constructor(link:string){
        super();
        this.path = '/helloworld';
        this.InitializeController(link)
    }

    public async runService(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, resp: Response<any, Record<string, any>>): Promise<any> {
        let response = await HelloWorld.wishHello()
        resp.status(StatusConstants.code200).send(response)
    }
}