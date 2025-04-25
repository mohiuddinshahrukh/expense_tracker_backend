import express from "express";
import { config, configDotenv } from "dotenv";
import cors from "cors";
// import router from "./src/routes/local_routes";
import routes from "./src/routes/v1/index.js";
import mongoose from "mongoose";
configDotenv();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("DB connection success");
    app.listen(port, (error) => {
      if (!error) {
        console.log(`App running on port ${port}`);
      } else {
        console.log("Error while starting server: ", error);
      }
    });
  })
  .catch((error) => {
    console.log(`Error while connecting with DB ${error}`);
  });

app.use("/api/v1", routes);
const port = process.env.PORT || 3300;
