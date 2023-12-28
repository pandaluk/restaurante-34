import { NextFunction, Request, Response } from "express";
import {JSONSchema4, validate} from "json-schema";
import { IJsonSchemaMiddleware } from "./IJsonSchemaMiddleware";

class JsonSchemaMiddleware implements IJsonSchemaMiddleware{
  private jsonSchema: JSONSchema4;

  constructor(schema: JSONSchema4) {
    this.jsonSchema = schema;
  }

  validateSchema(req: Request, res: Response, next: NextFunction) {
    try {
      const result = validate(req.body, this.jsonSchema);
  
      result.valid ? next() : res.status(400).send(result.errors);
      
    } catch (error) {
      throw error;
    }
    
  }

}

export default JsonSchemaMiddleware;