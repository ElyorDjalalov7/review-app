import express from "express";
import reviewRoutes from "./routes/review.routes";
import { errorHandler } from "./middleware/error";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reviews API",
      version: "1.0.0",
      description: "API for managing reviews",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/reviews", reviewRoutes);
app.use(errorHandler);

export default app;
