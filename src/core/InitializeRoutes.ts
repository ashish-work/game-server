import {Express} from 'express'
import { HelloWorldController } from '../controllers/helloworld/HelloWorldRouteController';
import { AbstractRouteController } from '../controllers/AbstractRouteController';
import { WaitingRoomController } from '../controllers/rooms/WaitngRoomController';

export class InitializeRoutes {
    public static async Initialize(app: Express, link: string){
        let routes = await this.getRoutes(link)
        routes.forEach(rc => {
            app.use("/", rc.router)
        })
    }

    public static async getRoutes(link: string):Promise<Array<AbstractRouteController>>{
        let routes: Array<AbstractRouteController> = []
        routes.push(new HelloWorldController(link))
        routes.push(new WaitingRoomController(link))
        return Promise.resolve(routes)
    }
}
