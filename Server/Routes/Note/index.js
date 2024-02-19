const express = require("express");
const router = express.Router();
const NoteController = require("../../Controllers/NoteController");
// const verifyToken = require("../../Middleware/Auth");
// const { Validation } = require("../../Middleware/Validate");

router
  .route("/note")
  .post(NoteController.CreateNote)
  .put(NoteController.updateNote)
  .get(NoteController.Getnote)
  .delete(NoteController.DeleteNote);
module.exports = router;
