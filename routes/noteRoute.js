const express = require("express");
const router = express.Router();
const {
  Notecreate,
  Noteupdate,
  Notedelete,
  NotefindOne,
  NotefindAll,
} = require("../controller/noteController.js");

// create a new note
router.post("/note", Notecreate);

// Retrieve all Notes
router.get("/note", NotefindAll);

// Retrieve a single Note with noteId
router.get("/note/:noteId", NotefindOne);

// Update a Note with noteId
router.put("/note/:noteId", Noteupdate);

// Delete a Note with noteId
router.delete("/note/:noteId", Notedelete);

module.exports = router;
