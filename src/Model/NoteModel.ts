import mongoose, { model } from "mongoose";
import * as uuid from "uuid";
export interface INote {
  id: {
    type: string;
    require: true;
  };
  title: {
    type: string;
    require: true;
  };
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
  },
  userId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const Note = model<INote>("Note", noteSchema);
