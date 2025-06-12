import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../components/ContextApi/UserContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const AddFee = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [monthyear, setmonthyear] = useState("");

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

  // const {addToCart} =useCart();

  // useEffect(() => {
  //   axios.get("http://localhost:9000/get/products")
  //     .then(response => setProducts(response.data.data))
  //     .catch(error => console.error("Error fetching products:", error));
  // }, []);

  const handleUploadExcel = async () => {
    console.log(monthyear);
   
      if (!file) {
        setError({ message: "please select file!" });
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      axios.post(
        `http://localhost:9000/upload_fee_excel/${monthyear}`,
        formData
      ).then((response) => {
            Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "student added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }).catch((error) => {
                          console.log(error);
                          
                            Swal.fire({
                              icon: "error",
                              title: "Server Error",
                              text: "Something went wrong. Please try again later.",
                            });
                        });
  };

  return (
    <>
      <div className="flex ">
        {user._id && <Sidebar />}
        <div className="flex-1 bg-gray-100 min-h-screen justify-center items-center">
          <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Fee Excels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              <div className="mb-4">
                <label className="block text-gray-700">chose fee month:</label>
                <input
                  type="month"
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    setmonthyear(e.target.value);
                  }}
                />
                <label className="block text-gray-700">Fee Excels:</label>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  id="studentExcel"
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                {error.message && (
                  <p className="text-red-500">{error.message}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleUploadExcel}
              className="w-20 p-2 border rounded bg-emerald-500 hover:bg-emerald-700"
            >
              {/* {" "} */}
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFee;
