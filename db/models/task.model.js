import mongoose, { Schema, model } from "mongoose";
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    assignTo: String,
    deadline:String,
  },
  { timestamps: true }
);


//........................Create Model.................................
const taskModel = model("task", taskSchema); // import in controlled.js

export default taskModel;
