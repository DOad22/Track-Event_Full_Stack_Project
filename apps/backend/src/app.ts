import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import participantRoutes from "./api/v1/routes/participantRoutes";
import eventRoutes from "./api/v1/routes/event.routes";
import pastEventsRoutes from "./api/v1/routes/pastEvents.routes";
import scoreRoutes from "./api/v1/routes/scoreRoutes";
import { setupSwagger } from "../config/swagger"; 
import { pastEventsErrorHandler } from "./api/v1/middleware/pastevents.errorHandler";


import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

app.use(clerkMiddleware());

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.use("/api/v1/scores", scoreRoutes);
app.use("/api/v1/participants", participantRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/past-events", pastEventsRoutes);

setupSwagger(app);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use(pastEventsErrorHandler);

export default app;
