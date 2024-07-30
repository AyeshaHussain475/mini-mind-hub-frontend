import "./App.css";
import Header from "./containers/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Phonics from "./containers/Phonics/Phonics";
import SignUp from "./containers/Auth/Signup";
import SignIn from "./containers/Auth/Signin";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import { RequireAuth } from "./utils/RequireAuth";

const ConditionalHeader = () => {
  const location = useLocation();
  const authRoutes = ["/login", "/sign-up", "/forgot-password"];

  if (authRoutes.includes(location.pathname)) return null;

  return <Header />;
};

function App() {
  return (
    <Router>
      <ConditionalHeader />
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to="/phonics" replace />} />
          <Route exact path="/phonics" element={<Phonics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
