import express, { Request, Response } from "express";
import { INote, Note } from "../Model/NoteModel";
const router = express.Router();

router.get("/notes", async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/notes/:id", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    res.status(200).json(note);
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal Server error" });
  }
});

router.post("/notes", async (req: Request, res: Response) => {
  try {
    const note: INote = req.body;
    await Note.create(note);
    res.status(200).json({ message: "Note Created Successfully" });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    res.send();
  }
});
router.put("/notes/:id", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const noteDetails: INote = req.body;
    const note = await Note.findByIdAndUpdate(noteId, noteDetails);
    res.status(200).json({ message: "Update successfully" });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    res.send();
  }
});
router.delete("/notes/:id", async (req: Request, res: Response) => {
  try {
    const nodeId = req.params.id;
    await Note.findByIdAndDelete(nodeId);
    res.status(200).json({ message: "deleted Successfully" });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    res.send();
  }
});

export { router as notesRouter };
