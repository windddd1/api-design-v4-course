import { Error } from "./types";
import express, { Express, RequestHandler } from "express";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { protect } from "./middlewares/auth.middleware";

const app: Express = express();

app.use(cookieParser());
app.use(cors() as RequestHandler);
app.use(morgan("dev") as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.use("/v1", routes);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found") as Error;
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  // response to client
  return res.status(status).json({
    status: err.status,
    error: {
      message: error.message,
    },
  });
});

export default app;
