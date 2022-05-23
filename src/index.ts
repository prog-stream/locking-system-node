import express, {Express} from "express";
import cors from "cors";
import sequelize from "./config/sequelize";
import routes from "./routes/routes";
import config from "./config/config";

const app: Express = express();

// use cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing Database connection

try {
  (async () => {
    await sequelize.sync({force: true}); // alter will update the table if changes made in the model
    console.log("Connection has been established successfully.");
  })();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// use Routes
app.use('/api/v1/', routes);

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${config.PORT}`
  );
});
