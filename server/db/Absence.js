const db = require("./db");
const Sequelize = require("sequelize");

const Absence = db.define("absence", {
  // id: {
  //     type: UUID,
  //     primaryKey: true,
  //     defaultValue: UUIDV4
  // },
});

module.exports = Absence;