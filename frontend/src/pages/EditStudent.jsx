import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../components/ContextApi/UserContext";
import Sidebar from "../components/Sidebar";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useUser();

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
    // feelist: "",
  });

  // const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:9000/get/student/${id}`)
      .then((response) => {
        const { studentname, fathername, regno, program } = response.data;
        setFormData({ studentname, fathername, regno, program });

        // if (file) {
        //   setPreviewImage(`http://localhost:8000/${file}`);
        // }
      })
      .catch((error) => console.error("Error getting student:", error));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       file: file,
  //     }));
  //     setPreviewImage(URL.createObjectURL(file));
  //   }
  // };

  const updateStudent = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("studentname", formData.studentname);
    data.append("fathername", formData.fathername);
    data.append("regno", formData.regno);
    data.append("program", formData.program);

    // if (formData.file) {
    //   data.append("file", formData.file);
    // }

    try {
      await axios.put(`http://localhost:9000/update/student/${id}`, data, {});

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: "Don't save",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success").then(() => {
            navigate("/home");
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          backendErrors[err.path] = err.msg;
        });
        setErrors(backendErrors);
      } else {
        console.error("Error updating student:", error);
      }
      Swal.fire({
        title: "Error",
        text: "Failed to update student. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="flex ">
        {user._id && <Sidebar />}
        <div className="flex-1 bg-gray-100 min-h-screen justify-center items-center">
          <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Edit Student</h2>
            <form
              onSubmit={updateStudent}
              className="bg-gray-300 p-5 shadow-md rounded"
            >
              <div className="mb-4">
                <label className="block mb-2">Student Name</label>
                <input
                  type="text"
                  id="studentname"
                  value={formData.studentname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.studentname && (
                  <p className="text-red-500">{errors.studentname}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Father name</label>
                <input
                  type="text"
                  id="fathername"
                  value={formData.fathername}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.fathername && (
                  <p className="text-red-500">{errors.fathername}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Reg No</label>
                <textarea
                  id="regno"
                  value={formData.regno}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                ></textarea>
                {errors.regno && <p className="text-red-500">{errors.regno}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Program</label>
                <textarea
                  id="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                ></textarea>
                {errors.program && (
                  <p className="text-red-500">{errors.program}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Update Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStudent;
