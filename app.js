import express from "express";
import Router from "./src/route/index.js";
import { CustomError } from "./src/utils/CustomError.js";
import globalErrorHandler from "./src/controller/error.controller.js";
import externalRouter from "./src/route/externalAPI.route.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", Router);
app.use("/external", externalRouter);

app.get("/", (req, res) => {
  res.send("Hello, from API");
});

app.use((req, res, next) => {
  next(new CustomError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
