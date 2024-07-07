import { LoggingWinston } from "@google-cloud/logging-winston";
import { Logger, createLogger, format, transports } from "winston";

let logger: Logger;
export function secretKey(): string {
  return process.env.SECRET_KEY || "";
}

export function setLogger(): any {
  const env = process.env.CLOUD_ENV || "";
  const loggingWinston = new LoggingWinston();
  logger = createLogger({
    format: format.combine(format.splat(), format.simple()),
    transports: [
      new transports.Console(),
      ...(process.env.CLOUD_ENV === "gcp" ? [loggingWinston] : []),
    ],
  });
}

export function getLogger() {
  if (logger) {
    return logger;
  } else {
    setLogger();
    return logger;
  }
}
