import express, { Express, NextFunction, Response } from "express";
import * as dotenv from "dotenv";
import { connectMongo, initializieFirebaseApp } from "./config/dbconfig";
import { notesRouter } from "./api/notes";
import cors from "cors";
import { secretKey } from "./config/config";
import * as jwt from "jsonwebtoken";
const app: Express = express();
app.use(cors());
app.use(express.json());
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
  console.log(`Application is running on Port: ${port}`);
});
