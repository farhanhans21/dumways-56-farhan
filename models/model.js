const { Sequelize, Model, DataTypes, STRING } = require("sequelize");
const db = require("../src/db");
model = {};

model.project = db.define(
  "project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tech: {
      type: DataTypes.ARRAY(STRING),
      allowNull: true,
    },
    textarea: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_react: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_node: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_next: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_ts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: "personal",
    timestamps: false,
    freezeTableName: true,
  }
);
model.userProject = db.define("userproject",{
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  born: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  hp:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: true,
  }
},
  {
    schema: "personal",
    timestamps: false,
    freezeTableName: true,
  });
module.exports = model;
