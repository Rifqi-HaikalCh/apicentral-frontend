export class SwaggerDefinition {
    swagger: string = "2.0";
    info: Info = new Info();
    host: string = "";
    basePath: string = "";
    tags: Tag[] = [];
    paths: { [key: string]: PathItem } = {};
    securityDefinitions: { [key: string]: SecurityScheme } = {};
    definitions: { [key: string]: Definition } = {};
    schemes: string[] = [];
    consumes: string[] = [];
    produces: string[] = [];
}

export class Info {
    description: string = "";
    version: string = "";
    title: string = "";
    termsOfService: string = "";
    contact: Contact = new Contact();
    license: License = new License();
}

export class Contact {
    name: string = "";
    url: string = "";
    email: string = "";
}

export class License {
    name: string = "";
    url: string = "";
}

export class Tag {
    name: string = "";
    description: string = "";
}

export class PathItem {
    get?: Operation;
    post?: Operation;
    put?: Operation;
    delete?: Operation;
    patch?: Operation;
    options?: Operation;
}

export class Operation {
    tags: string[] = [];
    summary: string = "";
    description: string = "";
    operationId: string = "";
    consumes: string[] = [];
    produces: string[] = [];
    parameters: Parameter[] = [];
    responses: { [key: string]: Response } = {};
    security: { [key: string]: string[] }[] = [];
}

export class Parameter {
    name: string | undefined;
    in: string | undefined;
    description?: string;
    required: boolean = false;
    type?: string;
    format?: string;
    schema?: Schema;
}

export class Response {
    description: string = "";
    schema?: Schema;
}

export class Schema {
    type?: string;
    properties?: { [key: string]: Property };
    required?: string[];
    $ref?: string;
}

export class SecurityScheme {
    type: string | undefined;
    name: string | undefined;
    in: string | undefined;
}

export class Definition {
    type?: string = "";
    properties: { [key: string]: Property } = {};
    required?: string[] = [];
    enum?: string[];
    items?: Items;
}

export class Property {
    type?: string;
    format?: string;
    description?: string;
    example?: any;
    items?: Items;
    $ref?: string;
    enum?: string[];
}

export class Items {
    type?: string;
    format?: string;
    $ref?: string;
}