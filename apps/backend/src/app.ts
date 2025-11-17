import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import participantRoutes from "./api/v1/routes/participantRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.use("/api/v1/participants", participantRoutes);

export default app;
