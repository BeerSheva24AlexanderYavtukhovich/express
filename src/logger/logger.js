import fs from "node:fs";
import morgan from "morgan";
import config from "config";
import path from "node:path";

const logPath = path.resolve("logs/log.log");
const streamConfig = config.get("morgan.stream");
const stream =
  streamConfig == "console"
    ? process.stdout
    : fs.createWriteStream(streamConfig, { flags: "a" });
const morgantype = config.get("morgan.type");

export function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
}
export const logger = morgan(morgantype, { stream });
