import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineAddBox } from "react-icons/md";
import { AiFillFileExcel } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <div className="w-64 min-h-screen bg-gray-300 text-white p-5 ">
        <h2 className="text-2xl font-semibold text-black mb-5">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/signup"
                className="flex items-center p-2 bg-cyan-600 hover:bg-cyan-800 rounded"
              >
                <FaUserPlus  className="text-sky-950 text-4xl mr-2 " />
                Signup
              </Link>
            </li>
            <li>
              <Link
                to="/add-student"
                className="flex items-center p-2 bg-cyan-600 hover:bg-cyan-800  rounded"
              >
                <MdOutlineAddBox  className="text-sky-950 text-4xl mr-2" />
                Add Student
              </Link>
            </li>
            <li>
              <Link
                to="/read-students"
                className="flex items-center p-2 bg-cyan-600 hover:bg-cyan-800  rounded"
              >
                <BiShow className="text-sky-950 text-4xl mr-2" /> View Students
              
              </Link>
            </li>

            <li>
              <Link
                to="/add-excel"
                className="flex items-center p-2 bg-cyan-600 hover:bg-cyan-800  rounded"
              >
                <AiFillFileExcel className="text-sky-950 text-4xl mr-2" /> Student
                Excel
              </Link>
            </li>
            <li >
              <Link
                to="/add-fee"
                className="flex items-center p-2 bg-cyan-600 hover:bg-cyan-800  rounded "
              >
                <AiFillFileExcel className="text-sky-950 text-4xl mr-2 " /> Fee Excel
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
