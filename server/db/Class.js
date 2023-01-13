const db = require("./db");
const Sequelize = require("sequelize");

const Class = db.define("class", {
  // id: {
  //     type: UUID,
  //     primaryKey: true,
  //     defaultValue: UUIDV4
  // },
  name: {
    type: Sequelize.STRING
  },
  // will need to add identifier code eventually
  school:{
    type:Sequelize.ENUM,
    values:['MS','HS']
  },
  grade:{
    type:Sequelize.INTEGER,
    validate:{
      min:6,
      max:12
    }
  },
  period:{
    type:Sequelize.INTEGER,
    validate:{
      min:1,
      max:7
    },
    allowNull:false,
  },
  letterDays:{
    type:Sequelize.ARRAY(Sequelize.STRING),
    allowNull:false
  },
  // grade:{
  //   type:Sequelize.INTEGER,
  //   validate:{
  //     min:6,
  //     max:12
  //   },
  //   allowNull:false
  // },
  // isFreePeriod:{
  //   type:Sequelize.BOOLEAN,
  //   defaultValue:false
  // },
  // startTime:{
  //   type:Sequelize.INTEGER,
  //   allowNull:false,
  //   validate:{
  //     isInt:true,
  //     min:600,
  //     max:1800
  //   }
  // },
  // endTime:{
  //   type:Sequelize.INTEGER,
  //   allowNull:false,
  //   validate:{
  //     isInt:true,
  //     min:600,
  //     max:1800
  //   }
  // },
});

module.exports = Class;