export interface IJsonSchemaMiddleware{
    validateSchema(req: any, res: any, next: any): any;
}