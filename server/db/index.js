const db = require("./db");
const User = require("./User");
const Class = require("./Class");
const UserClass = require('./UserClass');
const Day = require("./Day");
const Absence = require("./Absence");
const Coverage = require("./Coverage");
const Message = require("./Message");

User.belongsToMany(Class, { through: UserClass });
Class.belongsToMany(User, { through: UserClass });

Absence.belongsTo(User);
User.hasMany(Absence);

Coverage.belongsTo(User);
User.hasMany(Coverage);

Coverage.belongsTo(Day);
Day.hasMany(Coverage);

Coverage.belongsTo(Class);
Class.hasMany(Coverage);

Absence.belongsTo(Day);
Day.hasMany(Absence);

// User - Class M:M
// User - Absence 1:M
// User - Coverage 1:M
// Day - Absence 1:M
// Day - Coverage 1:M

module.exports = {
    db,
    User,
    Class,
    UserClass,
    Day,
    Absence,
    Coverage,
    Message
};