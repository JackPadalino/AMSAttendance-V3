const db = require("./db");
const Sequelize = require("sequelize");

const Coverage = db.define("coverage", {
  // id: {
  //     type: UUID,
  //     primaryKey: true,
  //     defaultValue: UUIDV4
  // },
});

module.exports = Coverage;