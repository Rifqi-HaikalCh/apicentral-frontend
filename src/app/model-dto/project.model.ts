import { Api } from "./api.model";
import { SwaggerDefinition, Info } from "./swagger.model"; // Ensure 'Info' is imported

export class Project {
    id: number;
    name: string;
    apis: Api[];
    swaggerInfo?: Info; // Connecting with Info from SwaggerDefinition

    constructor(id: number, name: string, apis: Api[], swaggerInfo?: Info) {
        this.id = id;
        this.name = name;
        this.apis = apis;
        this.swaggerInfo = swaggerInfo;
    }
}
