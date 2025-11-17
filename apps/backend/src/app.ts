import express from "express";
import cors from "cors";
import corsOptions from "../config/cors";
import scoreRoutes from "./api/v1/routes/scoreRoutes";
import { setupSwagger } from "../config/swagger";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/v1/scores", scoreRoutes);

// Health check
app.get("/", (_, res) => {
  res.status(200).send("EventHub backend running successfully!");
});

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

setupSwagger(app);

export default app;
