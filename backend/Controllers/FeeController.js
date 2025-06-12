import { ObjectId } from "mongodb";
import XLSX from "xlsx";
import Fee from "../models/FeeModel.js";
import Student from "../models/StudentModel.js";

export default {
  
  async uploadFeeExcel(req, res) {

    const {monthyear} = req.params;
    console.log(monthyear)
    if (!req.files || !req.files.file) {
      // console.log("file is missing!")
      return res.status(400).json({ message: "No File Upload" });
    }
    // console.log(req.files.file)
    const file = req.files.file;
    // console.log(file);
    const workbook = XLSX.read(file.data, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // console.log(workbook);
    // console.log(sheet);
    const data = XLSX.utils.sheet_to_json(sheet);
    // console.log(data)
    try {
      for (const row of data) {
        const { regno, amount, latefee, duedate, semester } = row;

        // console.log((monthyear(Date(duedate))))
          // console.log(new Date(duedate));
          // console.log((new Date(duedate)).toString().slice(4, 15));

          const newDueDate = (new Date(duedate)).toString().slice(4, 15);
        
        // monthyearDateduedate
        let student = await Student.findOne({ regno });

        if(!student){
          return res.status(400).json({
            message: `regno "${regno}" is incorrect or not found`,
          });s
        }
        for(const fee of student.feelist){
          // console.log(fee)
          const feeId= fee._id;
          const existingFee= await Fee.findById(feeId);
          if(existingFee.monthyear===monthyear){
            await Student.findByIdAndUpdate(student._id , { $pull:{feelist:existingFee._id}});
            await Fee.findByIdAndUpdate(existingFee._id);
          }
            

          }

          const newFee = await Fee({
            regno,
            amount,
            latefee,
            duedate: newDueDate,
            semester,
            monthyear,
          });
          student.feelist.push(newFee);
          await student.save();
          await newFee.save();
        }

    
      return res.status(201).json({ message: "Fee list added successfully" });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => ({
          msg: err.message,
          path: err.path,
        }));
        return res.status(400).json({ errors });
      }
      return res.status(500).json({ error: error.message });
    }
  },
};
