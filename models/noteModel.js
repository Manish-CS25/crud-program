const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema(
  {
    name: String,
    fathersName: String,
    //rollNo: String,
    //result: String,
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model("Note", NoteSchema);
