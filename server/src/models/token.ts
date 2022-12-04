import path from "path";
import mongoose from "mongoose";

const { Schema } = mongoose;

const generalSchema = new Schema(
  {
    token: {
      type: Schema.Types.String,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

generalSchema.set("toJSON", { virtuals: true });

const modelName = path.basename(__filename, ".ts");
const model = mongoose.model(modelName, generalSchema);

export default model;
