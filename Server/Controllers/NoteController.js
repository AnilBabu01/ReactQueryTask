const { config } = require("dotenv");
const Notes = require("../Models/note.model");
const removefile = require("../Middleware/removefile");
const respHandler = require("../Handlers");
config();

const CreateNote = async (req, res) => {
  let { note } = req.body;
  if (note != "") {
    try {
      let IsNote = await Notes.create({
        note: note,
      });

      if (IsNote) {
        return respHandler.success(res, {
          status: true,
          data: [IsNote],
          msg: "Note Added Successfully!!",
        });
      }
    } catch (err) {
      return respHandler.error(res, {
        status: false,
        msg: "Something Went Wrong!!",
        error: [err.message],
      });
    }
  } else {
    return respHandler.error(res, {
      status: false,
      msg: "field are required!!",
    });
  }
};

const Getnote = async (req, res) => {
  try {
    let notelist = await Notes.findAll();
    return respHandler.success(res, {
      status: true,
      data: notelist,
      msg: "Fetch All Notes Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateNote = async (req, res) => {
  let { id, note } = req.body;

  try {
    let status = await Notes.update(
      {
        note: note,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (status) {
      let IsNote = await Updatedgame.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: [IsNote],
        msg: "Notes Updated Successfully!!",
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const DeleteNote = async (req, res) => {
  try {
    let IsNote = await Notes.findOne({ id: req.body.id });
    if (IsNote) {
      await Notes.destroy({
        where: {
          id: IsNote.id,
        },
      });

      return respHandler.success(res, {
        status: true,
        data: [],
        msg: "Note Deleted Successfully!!",
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Something Went Wrong!!",
        error: ["not found"],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

module.exports = {
  CreateNote,
  Getnote,
  updateNote,
  DeleteNote,
};
