import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useUser } from "../components/ContextApi/UserContext";

const Home = () => {
  const {user, removeUser}=useUser();
  const [error, setError] = useState({});
  const [monthYear, setMonthYear] = useState("");
  const [regno, setregno] = useState("");
  const [studentDetail, setstudentDetail] = useState({
    studentname: "",
    regno: "",
    program: "",
    fathername: "",
    feelist: [],
  });

  const handleShowFeeDetail = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/get-fee-detail/${regno}`
      );
      setstudentDetail(response.data.data);
    } catch (error) {
      console.log(error);
      setError({ message: "Failed to fetch student details." });
    }
  };

  return (
    <>
    <div className="flex  ">
    {user._id && (
    <Sidebar/>
    )}

      <div className="flex-1 bg-gray-100 min-h-screen justify-center items-center">
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Home
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700">Reg No:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              onChange={(e) => setregno(e.target.value)}
            />
            {error.message && (
              <p className="text-red-500">{error.message}</p>
            )}

            <label className="block text-gray-700 mt-4">Choose fee month:</label>
            <input
              type="month"
              className="w-full p-2 border rounded"
              onChange={(e) => setMonthYear(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleShowFeeDetail}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700"
        >
          Show
        </button>
      </div>

      <hr className="my-6" />

      {studentDetail.studentname && (
        <div className="p-5">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Student Details
          </h2>

          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-5 border">
            <h3 className=" text-gray-600 ">Student Name: 
              {studentDetail.studentname}
            </h3>
            <p className="text-gray-600">Father's Name: {studentDetail.fathername}</p>
            <p className="text-gray-600">Reg No: {studentDetail.regno}</p>
            <p className="text-gray-600">Program: {studentDetail.program}</p>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-700">
                Fee Details for {monthYear}
              </h4>
              <table className="w-full text-left border-t">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="py-1">Amount</th>
                    <th className="py-1">Late Fee</th>
                    <th className="py-1">Due Date</th>
                    <th className="py-1">Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetail.feelist
                    .filter((fee) => fee.monthyear === monthYear)
                    .map((fee, idx) => (
                      <tr key={idx} className="text-sm text-gray-700 border-t">
                        <td className="py-2">{fee.amount}</td>
                        <td className="py-2">{fee.latefee}</td>
                  
                        <td className="py-2">{(fee.duedate).toString().slice(0, 10)}</td>
                        <td className="py-2">{fee.semester}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
        
      )}
        </div>
      </div>
    </>
  );
};

export default Home;
