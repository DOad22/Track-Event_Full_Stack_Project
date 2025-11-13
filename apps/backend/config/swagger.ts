import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Event Manager API",
      version: "1.0.0",
      description: "Simple API documentation for Event Manager",
    },
  },
  apis: ["./src/api/v1/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options as any);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
