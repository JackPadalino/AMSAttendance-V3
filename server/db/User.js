const db = require("./db");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = db.define("user", {
  // id: {
  //     type: UUID,
  //     primaryKey: true,
  //     defaultValue: UUIDV4
  // },
  firstName: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: true,
    },
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: true,
    },
    allowNull: false,
  },
  fullName: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: true,
    }
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull:true,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
    set(value) {
      this.setDataValue("username", value.toLowerCase());
    },
  },
  password: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true,
      //len: [10,18],
    },
  },
  role:{
    type:Sequelize.ENUM,
    values:['teacher','admin'],
    defaultValue:'teacher'
  }
  // email: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmail: true,
  //     notEmpty:true
  //   },
  //   unique: true,
  // },
  // absent: {
  //   type: Sequelize.INTEGER,
  //   defaultValue:0
  // },
  // covered: {
  //   type: Sequelize.INTEGER,
  //   defaultValue:0
  // },
});

// creating a fullName field for a newly created user
User.beforeCreate((user) => {
  user.fullName = `${user.firstName} ${user.lastName}`;
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id:user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;