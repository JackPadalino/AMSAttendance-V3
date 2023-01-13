const db = require("./db");
const Sequelize = require("sequelize");

const Day = db.define("day", {
  // id: {
  //     type: UUID,
  //     primaryKey: true,
  //     defaultValue: UUIDV4
  // },
  date: {
    type: Sequelize.STRING,
    validate: {
        isDate: true,
    }
  }
});

module.exports = Day;