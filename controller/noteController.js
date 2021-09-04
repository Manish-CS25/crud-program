const Note = require("../models/noteModel.js");

//Create and save a new Note
const Notecreate = (req, res) => {
  //validate request
  if (!req.body.fathersName) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  //Create a Note
  const note = new Note({
    name: req.body.name || "Untitled Note",
    fathersName: req.body.fathersName,
  });

  //Save Note in the database
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

// Retrieve and return all note from the database
const NotefindAll = (req, res) => {
  Note.find()
    .then((note) => {
      res.send(note);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

//find a single note with a noteId
const NotefindOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found  with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Error retrieving note with id " + req.params.noteId,
        });
      }
    });
};

//Update note identified by the noteId in the request
const Noteupdate = (req, res) => {
  //Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  //Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found  with id" + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found  with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
};

//Delete a note with the specified noteId in the request
const Notedelete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found  with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found  with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};

module.exports = {
  Notecreate,
  Notedelete,
  Noteupdate,
  NotefindOne,
  NotefindAll,
};
