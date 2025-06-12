import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiExit } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useUser } from "./ContextApi/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const { user, removeUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    axios
      .post("http://localhost:9000/logout")
      .then((response) => {
        console.log(response);
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "you are logout",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        removeUser();
        navigate("/home");
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error in logged out ! try again",
          });
        }
      });
  };

  return (
    <>
      <nav className="bg-gray-300 border-b-4 border-gray-400 text-white px-3 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-700">
          Student Fee Management System
        </h1>
        <ul className="nav-ul flex gap-5 items-center ">
          <li className="hover:bg-cyan-400 flex items-center px-2 py-1 rounded-md">
            <Link
              to="/home"
              className="flex items-center gap-1 hover:text-white-400"
            >
              {" "}
              <FaHome /> Home
            </Link>
          </li>

          <li className="hover:bg-cyan-400 flex items-center px-2 py-1 rounded-md">
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-white-400"
            >
              Login <FaSignInAlt />{" "}
            </Link>
          </li>

          <li className="hover:bg-cyan-400 flex items-center px-2 py-1 rounded-md">
            <Link
              to="/signup"
              className="flex items-center gap-1 hover:text-white-400"
            >
              Signup <FaSignInAlt />{" "}
            </Link>
          </li>

          {user._id && (
            <>
              <li className="hover:bg-cyan-400 flex items-center px-2 py-1 rounded-md">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 hover:text-white-400"
                >
                  Logout <FaSignOutAlt />
                </button>
              </li>
              <li className="hover:bg-cyan-400 flex items-center px-2 py-1 rounded-md">
                <p className="flex items-center gap-1 hover:text-white-400">
                  <BiUser /> {user.username}
                </p>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
