import type { CorsOptions } from "cors";
 
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
 
const corsOptions: CorsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200,
};
 
export default corsOptions;