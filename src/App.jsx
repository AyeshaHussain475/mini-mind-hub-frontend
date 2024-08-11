import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Phonics from "./containers/Phonics/Phonics";
import AddPhonic from "./containers/Phonics/AddPhonic";
import SignUp from "./containers/Auth/Signup";
import SignIn from "./containers/Auth/Signin";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import Layout from "./components/layout/Layout";
import { RequireAuth } from "./utils/RequireAuth";
import "./App.css";
import QuizListPage from "./containers/Quizzes/QuizListPage";
import QuizDetail from "./containers/Quizzes/QuizDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/phonics" replace />} />
            <Route exact path="/phonics" element={<Phonics />} />
            <Route exact path="/add-phonic" element={<AddPhonic />} />
            <Route exact path="/quiz-list" element={<QuizListPage />} />
            <Route exact path="/quiz/:quizId" element={<QuizDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
