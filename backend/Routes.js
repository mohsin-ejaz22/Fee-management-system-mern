import { Router } from "express";
import StudentController from "./Controllers/StudentController.js";
import FeeController from "./Controllers/FeeController.js";
import UserController from "./Controllers/UserController.js";
import userVerfication from "./Middlewares/UserMiddleware.js";
import passport from "passport"



const router = Router();
router.post("/create/student", StudentController.createStudent);
router.get("/get/students", StudentController.getStudents);
router.get("/get/student/:id", StudentController.getStudent);
router.put("/update/student/:id", StudentController.updateStudent);
router.delete("/delete/student/:id", StudentController.deleteStudent);
router.post("/upload_student_excel", StudentController.uploadStudentExcel);
router.post("/get-fee-detail/:regno",StudentController.studentFeeDetails)

//fee routes
router.post("/upload_fee_excel/:monthyear", FeeController.uploadFeeExcel);



// user routes
router.post("/signup", UserController.Signup);
router.post("/login", passport.authenticate("local"), UserController.Login);
router.post("/logout",UserController.Logout);






export default router;