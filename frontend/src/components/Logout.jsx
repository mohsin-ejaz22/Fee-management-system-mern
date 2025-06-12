import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:9000/logout"); //
        alert("Logged out successfully");
        navigate("/home");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Try again.");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p className="text-lg font-semibold text-gray-700">Logging out...</p>
    </div>
  );
};

export default Logout;
