import express, { Request, Response } from "express";
import { INote, Note } from "../Model/NoteModel";
import { getFirestoreInstance } from "../config/dbconfig";
import { getLogger } from "../config/config";
const router = express.Router();
const logger = getLogger();
router.get("/notes", async (req: Request, res: Response) => {
  try {
    const notesRef = getFirestoreInstance();
    await notesRef.get().then((value: any) => {
      const data = value.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      res.status(200).send(data);
    });
  } catch (err) {
    logger.error("Error: {}", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/notes/:id", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const noteRef = getFirestoreInstance();
    await noteRef
      .doc(noteId)
      .get()
      .then((value: any) => {
        const data = value.doc();
        res.status(200).send({ data });
      });
    logger.info(noteId);
  } catch (err) {
    logger.error("Error: {}", err);
    res.status(500).json({ message: "internal Server error" });
  }
});

router.get("/notes/user/:id", async (req: Request, res: Response) => {});

router.post("/notes", async (req: Request, res: Response) => {
  try {
    const note: INote = req.body;
    const netRef = getFirestoreInstance();
    netRef
      .add({
        title: note.title,
        text: note.text,
        userId: note.userId ? note.userId : "",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((value: any) => {
        logger.info("Value added successfully");
        res.status(200).json({ message: "Note Created Successfully" });
      });
  } catch (err) {
    logger.error("Error: {}", err);
    res.status(500).json({ message: "Internal Server Error" });
    res.send();
  }
});
router.put("/notes/:id", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const noteDetails: INote = req.body;
    const notesRef = getFirestoreInstance();
    await notesRef
      .doc(noteId)
      .update(noteDetails)
      .then((value: any) => {
        logger.info("updated successfully");
        res.status(200).json({ message: "Update successfully" });
      });
  } catch (err) {
    logger.error("Error: {}", err);
    res.status(500).json({ message: "Internal Server Error" });
    res.send();
  }
});
router.delete("/notes/:id", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    logger.info("deleting user with id {}", noteId);
    const noteRef = getFirestoreInstance();
    await noteRef
      .doc(noteId)
      .delete()
      .then(() => {
        logger.info("deleted Successfully");
      });
    res.status(200).json({ message: "deleted Successfully" });
  } catch (err) {
    logger.error("Error: {}", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as notesRouter };
