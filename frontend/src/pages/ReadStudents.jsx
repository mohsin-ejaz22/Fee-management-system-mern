import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { useUser } from "../components/ContextApi/UserContext";
import Sidebar from "../components/Sidebar";
const ReadStudents = () => {
  const [students, setStudents] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:9000/get/students")
      .then((response) => setStudents(response.data.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  let srNo = 0;
  function sNumber() {
    return (srNo = srNo + 1);
  }

  return (
    <>
      <div className="flex ">
        {user._id && <Sidebar />}
        <div className="flex-1 bg-gray-100 min-h-screen justify-center items-center">
          <div className="p-5">
            {/* <p>{user}</p> */}
            <h2 className="text-2xl font-semibold mb-4">View Students</h2>
            <div className="overflow-x-auto ">
              <table className="min-w-full bg-gray-300 border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Sno</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Father Name</th>
                    <th className="py-2 px-4 border">Reg No</th>
                    <th className="py-2 px-4 border">Program</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border text-center">
                      <td className="py-2 px-4 border">{sNumber()}</td>

                      <td className="py-2 px-4 border">
                        {student.studentname}
                      </td>
                      <td className="py-2 px-4 border">
                        {student.fathername}
                      </td>
                      <td className="py-2 px-4 border">{student.regno}</td>
                      <td className="py-2 px-4 border">{student.program}</td>
                      <td className="py-2 px-4 flex justify-center">
                        <Link
                          to={`/edit-student/${student._id}`}
                          className=" text-sky-600 hover:text-sky-800 text-4xl  px-3 py-1 rounded "
                        >
                          <AiOutlineEdit />
                        </Link>
                        <Link
                          to={`/delete-student/${student._id}`}
                          className="text-red-500 hover:text-red-700 text-4xl px-3 py-1 rounded"
                        >
                          <MdOutlineDelete />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadStudents;
