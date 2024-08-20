import express, { Express, NextFunction, Response } from "express";
import * as dotenv from "dotenv";
import { connectMongo, initializieFirebaseApp } from "./config/dbconfig";
import { notesRouter } from "./api/notes";
import cors from "cors";
import { getLogger, secretKey } from "./config/config";
import * as jwt from "jsonwebtoken";
import https from "https";
import fs from "fs";
const app: Express = express();
app.use(cors());
app.use(express.json());
const logger = getLogger();
app.use((req: any, resp: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    let key = secretKey() || "";
    jwt.verify(token, key, (err: any, user: any) => {
      if (!err) {
        console.log("token Validated");
        req.user = user;
        next();
      } else {
        console.log(`error Occured: ${err}`);
        resp.status(401).json({ message: "Authentication required." });
        resp.send();
      }
    });
  } else {
    resp.status(401).json({ message: "Authentication required." });
    resp.send();
  }
});
dotenv.config();
let serviceAccount = "";
if (process.env.ACCOUNT_DETAILS) {
  serviceAccount = JSON.parse(process.env.ACCOUNT_DETAILS.toString());
}
initializieFirebaseApp(serviceAccount);
const port = process.env.PORT || 3000; // 4301
app.use(notesRouter);
app.listen(port, () => {
  logger.info(`Application is running on Port: ${port}`);
});
const httpsCredentials = {
  key: fs.readFileSync(__dirname + "/server.key", "utf-8"),
  cert: fs.readFileSync(__dirname + "/server.cert", "utf-8"),
};

const httpsServer = https.createServer(httpsCredentials, app);
const securePort = process.env.SECURE_PORT || 443;
httpsServer.listen(securePort, () => {
  logger.info(`Secure Server is running on port ${securePort}`);
});
