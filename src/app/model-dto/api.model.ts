import { ApiMethod } from "./api-method.model";
import { SwaggerDefinition } from "./swagger.model";

export class Api {
    id: number;
    projectId: number;
    projectName: string;
    name: string;
    url: string;
    methods: ApiMethod[];
    swaggerDefinition?: SwaggerDefinition; // Connecting with SwaggerDefinition

    constructor(
        id: number,
        projectId: number,
        projectName: string,
        name: string,
        url: string,
        methods: ApiMethod[],
        swaggerDefinition?: SwaggerDefinition
    ) {
        this.id = id;
        this.projectId = projectId;
        this.projectName = projectName;
        this.name = name;
        this.url = url;
        this.methods = methods;
        this.swaggerDefinition = swaggerDefinition;
    }
}
