import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
  logging: false, // Remove logs SQL do terminal
});

export default sequelize;
