import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },


});

userSchema.plugin(passportLocalMongoose);

const   User = mongoose.model(" User", userSchema);
export default  User;
