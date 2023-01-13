const db = require("./db");
const Sequelize = require("sequelize");

const UserClass = db.define('userclass',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
});

module.exports = UserClass; 