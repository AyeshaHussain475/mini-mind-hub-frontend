import "./App.css";
import Home from "./containers/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Phonics from "./containers/Phonics/Phonics";
import SignUp from "./containers/Auth/Signup";
import SignIn from "./containers/Auth/Signin";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import { RequireAuth } from "./utils/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<RequireAuth />}>
          <Route exact path="/phonics" element={<Phonics />} />
          <Route exact path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
