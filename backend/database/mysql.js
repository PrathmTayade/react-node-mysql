import { Sequelize, Model, DataTypes } from "sequelize";

export const db = new Sequelize("mysql", "admin", "admin", {
  host: "localhost",
  dialect: "mysql",
});

export const syncDB = async () => {
  try {
    await db.sync();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
