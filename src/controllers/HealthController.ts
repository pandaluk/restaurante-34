import { IHealthController } from "@/interfaces";
import { Response, Request } from "express";


export default class HealthController implements IHealthController {
    
    
    async getHealth(req: Request, res: Response) {

          return res.status(200).json({ message: "Application Alive!!!"});
    }        
}
