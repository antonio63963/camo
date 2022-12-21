import path from "path";
import mongoose from "mongoose";

const { Schema } = mongoose;

import { User } from './user.type';

const generalSchema = new Schema<User>(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: function() {
        return !this.googleId;
      },
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    picture: {
      type: Schema.Types.String,
    },
    googleId: {
      type: Schema.Types.String,
      required: function() {
        return !this.password;
      }
    },
    role: {
      type: Schema.Types.String,
      enum: ["admin", "moderator", "user"],
      default: "user",
    },
    isBanned: {
      type: Schema.Types.Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

generalSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

generalSchema.set("toJSON", { virtuals: true });

const modelName = path.basename(__filename, ".ts");
const model = mongoose.model(modelName, generalSchema);

export default model;
