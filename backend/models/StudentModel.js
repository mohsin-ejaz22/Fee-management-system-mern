import mongoose, { Schema } from "mongoose";
import Fee from "./FeeModel.js";

// Define the Student schema
const studentSchema = new mongoose.Schema({
  studentname: {
    type: String,
    required: [true, "Product name is required!"],
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [30, "Product name must be less than 50 characters long"],

  },
  fathername: {
    type: String,
    required: [true, "Product name is required!"],
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [30, "Product name must be less than 50 characters long"],

  },
  regno: {
    type: String,
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [30, "Product name must be less than 50 characters long"],
  },
  program: {
    type: String,
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [30, "Product name must be less than 50 characters long"],
  },
  feelist :[
    {
      type: Schema.Types.ObjectId,
      ref: "Fee",
    },
  ],


  
});

  studentSchema.post("findOneAndDelete",async(student)=>{
    if(student){
      await Fee.deleteMany({_id: {$in: student.feelist}});

    }

  });


const Student = mongoose.model("Student ", studentSchema);
export default Student ;
