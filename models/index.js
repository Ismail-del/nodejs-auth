import dbConfig from "../config/db.config.js";
import Sequelize from 'sequelize';
import tutorials from "./tutorial.model.js";
import users from "./user.model.js";
import roles from "./role.model.js";



const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
})

const db = {
    Sequelize,
    sequelize,
    tutorials:tutorials(sequelize, Sequelize),
    users:users(sequelize, Sequelize),
    roles:roles(sequelize, Sequelize),

};
db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];


export default db;
