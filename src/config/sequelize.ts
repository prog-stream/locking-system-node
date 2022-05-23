import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import config from "./config";

const {DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST} = config;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  models: [path.resolve(__dirname, '../models')],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default sequelize;
