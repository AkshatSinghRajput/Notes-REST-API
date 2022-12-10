const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  userId:{
     type: mongoose.Schema.Types.ObjectId,
     ref:"User"
  },
  title:{
    type:String,
    required: true
  },
  body:{
    type:String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Note = mongoose.model("note", noteSchema);
Note.createIndexes();
module.exports = Note;