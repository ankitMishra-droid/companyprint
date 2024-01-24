import Navbar from "./component/Header/Navbar";
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import Login from "./component/pages/Login.jsx";
import SignUp from "./component/pages/SignUp.jsx";
import Home from "./component/pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signUp" element={<SignUp />}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
