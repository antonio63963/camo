import path from "path";
import mongoose from "mongoose";

const { Schema } = mongoose;

const generalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
  },
);

generalSchema.set("toJSON", { virtuals: true });

const modelName = path.basename(__filename, ".ts");
const model = mongoose.model(modelName, generalSchema);

export default model;
