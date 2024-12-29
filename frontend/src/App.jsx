import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
function App() {
  return (
    <>
      <div data-theme="coffee">
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
