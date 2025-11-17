import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./api/v1/routes/event.routes";
import pastEventsRoutes from "./api/v1/routes/pastEvents.routes";
import { setupSwagger } from "../config/swagger"; 
import { pastEventsErrorHandler } from "./api/v1/middleware/pastevents.errorHandler";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Event Manager API is running successfully!");
});

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/past-events", pastEventsRoutes);

// Swagger 
setupSwagger(app);

//  MIDDLEWARE
app.use(pastEventsErrorHandler);

export default app;
