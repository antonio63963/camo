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
    imageAsset: {
      type: Schema.Types.String,
      required: function() {
        return !this.imageLink;
      },
    },
    imageLink: {
      type: Schema.Types.String,
      required: function() {
        return !this.imageAsset;
      }
    },
    about: {
      type: Schema.Types.String,
      required: true,
    },
    // comments: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.String,
        required: true,
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
