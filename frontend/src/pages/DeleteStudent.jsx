import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../components/ContextApi/UserContext";
import Sidebar from "../components/Sidebar";

const DeleteStudent = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

    const {user} = useUser()
      

      
          const checkUser=()=>{
              if(!user._id){
                 navigate("/home");
              }else{
                  return
              }
          }
      
          useEffect(() => {
              checkUser();
           } ,[]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/get/student/${id}`)
      .then((response) => setStudent(response.data))
      .catch((error) => console.error("Error getting product:", error));
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:9000/delete/student/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted successfully.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/read-students");
            });
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to delete product. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (


    <>

       <div className="flex ">
    

    {user._id && (
    <Sidebar/>
    )}
<div className="flex-1 bg-gray-100 min-h-screen justify-center items-center">



    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Delete Student</h2>
      {student ? (
        <div className="bg-gray-300 p-5 shadow-md rounded">
          <h3 className="text-xl font-semibold mb-2">{student.studentname}</h3>
          <p className="mb-4">{student.fathername}</p>
          <p className="mb-4">{student.regno}</p>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm Delete
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
</div>
</div>

        </>
  );
};

export default DeleteStudent;
