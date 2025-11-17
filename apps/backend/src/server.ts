import dotenv from "dotenv";
dotenv.config();

import app from './app';
import { setupSwagger } from '../config/swagger' 

setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
