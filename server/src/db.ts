import mongoose, { MongooseOptions } from "mongoose";
import { Logger } from "tslog";

const log: Logger = new Logger();

const dbConfig = {
  url: `mongodb://localhost:27017/camo`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

function runDB() {
  mongoose.connect(dbConfig.url, dbConfig.options as MongooseOptions);
  const db = mongoose.connection;
  db.once("open", () => {log.info("DB has ran successfully")});
  db.once("close", () => log.info("DB has failed"));
  db.on("error", (err) => log.error("Error: " + err));
};

export default runDB;
