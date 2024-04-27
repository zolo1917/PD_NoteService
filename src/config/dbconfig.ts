import * as mongoose from "mongoose";

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
