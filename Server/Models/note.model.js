const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Notes = sequelize.define("note", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Notes;
