import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import VerifyOTP from "./Pages/VerifyOTP";
function App() {
  return (
    <>
      <div data-theme="coffee">
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
