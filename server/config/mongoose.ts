import mongoose from "mongoose";
import config from "config";
console.log("livro_nodejs:config:mongoose");
mongoose.connect(config.get("mongo.uri"));
mongoose.connection.on("error", (err) => console.log("mongobd", err));
export default mongoose;
