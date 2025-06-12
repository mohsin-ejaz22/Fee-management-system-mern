import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./pages/AddStudent";
// import EditProduct from "./pages/EditProduct";
// import DeleteProduct from "./pages/DeleteProduct";
// import ProductCards from "./pages/ProductCards";
// import ShowAddToCart from "./pages/ShowAddToCart";
import ReadStudents from "./pages/ReadStudents";
import AddExcel from "./pages/AddExcel";
import AddFee from "./pages/AddFee";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import EditStudent from "./pages/EditStudent";
import DeleteStudent from "./pages/DeleteStudent";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-grow ">
        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/read-students" element={<ReadStudents />} />
          <Route path="/add-excel" element={<AddExcel />} />
          <Route path="/add-fee" element={<AddFee />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/delete-student/:id" element={<DeleteStudent />} />
           <Route path="/" element={<Home />} />
          
          <Route path="/home" element={<Home />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
