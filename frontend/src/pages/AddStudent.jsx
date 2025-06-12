import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";
import { useUser } from "../components/ContextApi/UserContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AddStudent = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const checkUser = () => {
    if (!user._id) {
      navigate("/home");
    } else {
      return;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const [formData, setFormData] = useState({
    studentname: "",
    fathername: "",
    regno: "",
    program: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("studentname", formData.studentname);
    data.append("fathername", formData.fathername);
    data.append("regno", formData.regno);
    data.append("program", formData.program);

    try {
      await axios.post(
        "http://localhost:9000/create/student",
        // headers: {
        //   'Authorization': token
        // }
        data
      );
      setErrors({});
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "student added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      setFormData({
        studentname: "",
        fathername: "",
        regno: "",
        program: "",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          backendErrors[err.path] = err.msg;
        });
        setErrors(backendErrors);
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  return (
    <>
      <div className="flex ">
        {user._id && <Sidebar />}
        <div className="flex-1 bg-gray-100 min-h-screen justify-center items-center">
          <div className="max-w-lg mx-auto mt-10 bg-gray-300 p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Student Name:</label>
                <input
                  type="text"
                  id="studentname"
                  className="w-full p-2 border rounded"
                  value={formData.studentname}
                  onChange={handleChange}
                />
                {errors.studentname && (
                  <p className="text-red-500">{errors.studentname}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Father Name:</label>
                <input
                  type="text"
                  id="fathername"
                  className="w-full p-2 border rounded"
                  value={formData.fathername}
                  onChange={handleChange}
                />
                {errors.fathername && (
                  <p className="text-red-500">{errors.fathername}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Reg No :</label>
                <textarea
                  id="regno"
                  className="w-full p-2 border rounded"
                  value={formData.regno}
                  onChange={handleChange}
                ></textarea>
                {errors.regno && <p className="text-red-500">{errors.regno}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Program :</label>
                <textarea
                  id="program"
                  className="w-full p-2 border rounded"
                  value={formData.program}
                  onChange={handleChange}
                ></textarea>
                {errors.program && (
                  <p className="text-red-500">{errors.program}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
