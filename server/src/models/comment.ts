import path from "path";
import mongoose from "mongoose";

import { Comment } from "./comment.type";

const { Schema } = mongoose;

const generalSchema = new Schema<Comment, mongoose.Model<Comment>>({
  pinId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: Schema.Types.String,
    required: true,
  },
  data: {
    type: Schema.Types.Number,
    required: true,
  },
});

generalSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
generalSchema.set("toJSON", { virtuals: true });

const modelName = path.basename(__filename, ".ts");
const model = mongoose.model(modelName, generalSchema);
export default model;
