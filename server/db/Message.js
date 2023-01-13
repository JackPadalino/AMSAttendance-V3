const db = require("./db");
const Sequelize = require("sequelize");

const Message = db.define("message", {
  // id: {
  //     type: UUID,
  //     primaryKey: true,
  //     defaultValue: UUIDV4
  // },
  content: {
    type: Sequelize.STRING
  }
});

module.exports = Message;