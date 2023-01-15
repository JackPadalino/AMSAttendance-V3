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

// absences
Absence.belongsTo(User);
User.hasMany(Absence);

Absence.belongsTo(Day);
Day.hasMany(Absence);

// coverages
Coverage.belongsTo(User);
User.hasMany(Coverage);

Coverage.belongsTo(Class);
Class.hasMany(Coverage);

Coverage.belongsTo(Day);
Day.hasMany(Coverage);

// User - Class M:M

// Absence - User 1:M
// Absence - Day 1:M

// Coverage - User 1:M
// Coverage - Class 1:M
// Coverage - Day 1:M

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