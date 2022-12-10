const { validationResult } = require("express-validator");
const globalEmitter = require("../emitter/globalEmitter");

const Note = require("../models/note.model");


async function getNotes(req, res) {
  try {
    let id = req.userId;
    let data = await Note.find({ userId: req.userId });
    if (data.length === 0) {
      return res.status(404).json({ error: "No notes found!!!" });
    }
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getNote(req, res) {
  try {
    let noteId = req.params.id;
    let noteData = await Note.findOne({ _id: noteId, userId: req.userId });
    if (!noteData) {
      return res.status(404).json({ error: "Note doesn't exists!!" });
    }
    // if (noteData.userId.toString() !== req.userId) {

    //   return res.status(401).json({ error: "Unauthorized Access!!!" });
    // }
    res.json(noteData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNote(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ error: errors.array() });
  }
  let { title, body } = req.body;
  try {
    let note = await Note.create({
      userId: req.userId,
      title: title,
      body: body,
    });
    res.json({ note });
    globalEmitter.emit("createNote", note._id);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateNote(req, res) {
  try {
    let noteId = req.params.id;
    let noteData = await Note.findOne({ _id: noteId, userId: req.userId });
    if (!noteData) {
      return res.status(404).json({ error: "Note doesn't exists!!" });
    }
    let { title, body } = req.body;
    let note = {};
    if (title) {
      note.title = title;
    }
    if (body) {
      note.body = body;
    }

    noteData = await Note.findByIdAndUpdate(
      noteId,
      { $set: note },
      { new: true }
    );
    res.json(noteData);
    globalEmitter.emit("updateNote", noteData._id);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteNote(req, res) {
  try {
    let noteId = req.params.id;
    let noteData = await Note.findOne({ _id: noteId, userId: req.userId });
    if (!noteData) {
      return res.status(404).json({ error: "Note doesn't exists!!" });
    }
    let deletedNote = await Note.findByIdAndDelete(noteId).then((note) => {
      res.json({ message: "Deleted Successfully" });
      globalEmitter.emit("deleteNote", note._id);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getNotes, getNote, createNote, updateNote, deleteNote };
