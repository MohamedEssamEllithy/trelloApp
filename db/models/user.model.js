import {Schema ,model} from "mongoose";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      minLength: [2, "min char is 2"],
      maxLength: [10, "max length is 10"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type :String,
        require:true
    },
    age: Number,
    gender: String,
    phone: String, 
    isVerified: Boolean,
    isDeleted:Boolean
  },
  { timestamps: true }
);

//........................Create Model.................................
const userModel = model("User", userSchema); // import in controlled/js

export default userModel;