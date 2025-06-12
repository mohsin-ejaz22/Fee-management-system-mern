import mongoose, { Schema } from "mongoose";

// Define the fee schema
const feeSchema = new mongoose.Schema({
  regno: {
    type: String,
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [30, "Product name must be less than 50 characters long"],
  },

  amount: {
    type: Number,
    required: [true, "Product name is required!"],
  },
  latefee: {
    type: Number,
  },
  duedate:{
    type: Date,
    required: [true, "Product name is required!"],
  },
  semester:{
    type:String,
  required: [true, "Product name is required!"],
  },
   monthyear:{
    type:String
  }

});

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;
