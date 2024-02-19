//add models and migrate that models
const sequelize = require("./Connect");
const Notes = require("../Models/Notes.model");
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
