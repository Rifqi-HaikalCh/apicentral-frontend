export class ApiMethod {
    tags: string[];       // Method description from tags in the backend
    method: string;       // Method such as 'GET', 'POST', 'PUT', 'DELETE'
    path: string;         // URL path like '/restfifpayment/api/get_transaction'

    constructor(tags: string[], method: string, path: string) {
        this.tags = tags;
        this.method = method;
        this.path = path;
    }
}
