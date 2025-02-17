import express from "express";
import { errorHandler } from "../errors/errors.js";
import coursesRoute from "../routes/courses.js";
import { logger, logMessage } from "../logger/logger.js";
import accountsRoute from "../routes/accounts.js";
import dotenv from "dotenv";
import { authenticate } from "../middleware/auth.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());
app.use(logger);
app.use(authenticate());
app.use("/api/v1/courses", coursesRoute);
app.use("/accounts", accountsRoute);
app.use((req, res) => {
  res.status(404).send(`path ${req.path} is not found`);
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
logMessage("server started");
console.log("env_port: ", process.env.PORT); //env checkup
app.use(errorHandler);
