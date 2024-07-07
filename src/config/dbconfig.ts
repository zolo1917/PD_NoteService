import * as mongoose from "mongoose";
import { getLogger } from "./config";
import { ServiceAccount, cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
export function connectMongo() {
  console.log("Initiating connection to mongo instance");
  mongoose.connect(process.env.MONGO_URI || "", {
    dbName: "NotesCollection",
    user: process.env.MONGO_USER || "",
    pass: process.env.MONGO_PASSWORD || "",
    autoIndex: true,
    autoCreate: false,
  });
}

let app;
let firebaseDb: any;
const logger = getLogger();

export const initializieFirebaseApp = (serviceAccount: any) => {
  try {
    logger.info("Initialize Firebase");
    app = initializeApp({
      credential: cert(<ServiceAccount>serviceAccount),
      projectId: "my-test-apps-424418",
    });
    logger.info("Initialization complete");
    firebaseDb = getFirestore(app, "firestore-base");
    return app;
  } catch (err) {
    logger.error("Error in Initializing firebase");
  }
};

export const getFirestoreInstance = () => firebaseDb.collection("Notes");
