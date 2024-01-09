
import { IBuildRoutes, IHealthController } from "@/interfaces";



class HealthRoutes implements IBuildRoutes {
    private express: any;
    private healthController: IHealthController;
    private BASE_URL: string;
    constructor(
        express: any,
        healthController: IHealthController,
        BASE_URL: string
    ) {
        this.express = express;
        this.healthController = healthController;
        this.BASE_URL = BASE_URL;
    }

    buildRoutes() {
        this.express
            .get(
                `${this.BASE_URL}/health/`,
                this.healthController.getHealth.bind(
                    this.healthController
                )
            )
    }
}

export default HealthRoutes;