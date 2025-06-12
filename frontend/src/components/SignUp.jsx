import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";
import { useUser } from "./ContextApi/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
// axios.defaults.withCredentials = true;

const SignUp = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  // const checkUser = () => {
  //   if (!user._id) {
  //     navigate("/home");
  //   } else {
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);

    await axios
      .post("http://localhost:9000/signup", data)
      .then((response) => {

          if(response){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signup successfully ow please login!",
          showConfirmButton: false,
          timer: 1500,
        })
        }
        navigate("/home");
                  setErrors({});

      })
      .catch((error) => {
        console.log(error);
        if(error){
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: "Please check your details and try again.",
          });
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        )
         {
          if(error.response.errors){
            Swal.fire({
              icon: "error",
              title: "Signup Failed",
              text: "Please check your details and try again.",
            });
          }
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
    <>
      <div className="flex ">
        {user._id && <Sidebar />}
        <div className="flex-1 bg-gray-100 min-h-screen justify-center items-center">
          <div className="max-w-lg mx-auto mt-10 bg-gray-300 p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Signup to Proo</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 border rounded"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
              >
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
