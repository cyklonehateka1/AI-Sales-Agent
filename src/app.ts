import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import callRoutes from "./routes/sendCall";
import calendarRoutes from "./routes/calendar";

dotenv.config();
const app: Application = express();
const port: number = 8000;
app.use(express.json());
app.use(cors());

interface CustomError extends Error {
  status?: number;
}

app.use("/calls", callRoutes);
app.use("/calendar", calendarRoutes);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
