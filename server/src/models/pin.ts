import path from "path";
import mongoose from "mongoose";

import { General } from "./pin.type";

const { Schema } = mongoose;

const generalSchema = new Schema<General>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: Schema.Types.String,
      required: true,
    },
    about: {
      type: Schema.Types.String,
      required: true,
    },
    comments: [
      {
        id: {
          type: Schema.Types.String,
          required: true,
          unique: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ret: "user",
        },
        message: {
          type: Schema.Types.String,
          required: true,
        },
        data: {
          type: Schema.Types.Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

/* add virtual field id */
generalSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
generalSchema.set("toJSON", { virtuals: true });

const modelName = path.basename(__filename, ".ts");
const model = mongoose.model(modelName, generalSchema);

export default model;
