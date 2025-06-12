import { ObjectId } from "mongodb";
import path from "path";
import Student from "../models/StudentModel.js";
import XLSX from "xlsx";

export default {
  async createStudent(req, res) {
    const { studentname, fathername, regno, program } = req.body;

    try {
      const newStudent = new Student({
        studentname,
        fathername,
        regno,
        program,
      });
      await newStudent.save();

      return res.status(201).json(newStudent);
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

  async getStudents(req, res) {
    const students = await Student.find({});
    return res.json({ data: students });
  },

  async getStudent(req, res) {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(student);
  },

  async updateStudent(req, res) {
    const studentId = req.params.id;
    const { studentname, fathername, regno, program } = req.body;
    // const file = req.files ? req.files.file : null;
    // const filePath = file? `uploads/${Date.now()}${path.extname(file.name)}`: null;

    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
      const existingStudent = await Student.findById(studentId);
      if (!existingStudent) {
        return res.status(404).json({ message: "Product not found" });
      }
      existingStudent.studentname = studentname;
      existingStudent.fathername = fathername;
      existingStudent.regno = regno;
      existingStudent.program = program;

      await existingStudent.save();
      return res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          errors: Object.values(error.errors).map((err) => ({
            msg: err.message,
            path: err.path,
          })),
        });
      }
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  },

  async deleteStudent(req, res) {
    const studentId = req.params.id;

    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const existingStudent = await Student.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({ message: "Product not found" });
    }

    try {
      const student =await Student.findByIdAndDelete(studentId);
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },


  async studentFeeDetails(req,res){
    const {regno} = req.params;
    const student =await Student.findOne({regno}).populate("feelist").exec();
    if (!student){
      return res.status(400).json({ message: "Invalid student ID" });
    }
    return res.status(200).json({ data:student });
  },




  async uploadStudentExcel(req, res) {
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
        const { studentname, fathername, regno, program } = row;
        let student = await Student.findOne({ regno });
        if (!student) {
          const newStudent = await Student({
            studentname,
            fathername,
            regno,
            program,
          });
          await newStudent.save();
        }
      }
      return res.status(201).json({ message: "Student added successfully" });
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
