import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillPrinter } from "react-icons/ai";
import { useUser } from "./ContextApi/UserContext";
axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const { user, addUser } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);

    await axios
      .post("http://localhost:9000/login", data)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/home");
        addUser(response.data.user);
        // console.log(user)
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          console.log("error detected");
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
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-300 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login to Proo</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
          />
          {/* {errors.studentname && <p className="text-red-500">{errors.studentname}</p>} */}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
          />
          {/* {errors.fathername && <p className="text-red-500">{errors.fathername}</p>} */}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
