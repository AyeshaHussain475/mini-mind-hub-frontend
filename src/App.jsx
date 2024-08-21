import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddAnimalPhonic from "./containers/Phonics/Animal/AddAnimal/AddAnimal";
import SignUp from "./containers/Auth/Signup";
import SignIn from "./containers/Auth/Signin";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import Layout from "./components/layout/Layout";
import { RequireAuth } from "./utils/RequireAuth";
import QuizListPage from "./containers/Quizzes/QuizListPage";
import EditQuiz from "./containers/Quizzes/EditQuiz/EditQuiz";
import PhonicsPage from "./containers/Phonics/Phonics";
import AttemptQuiz from "./containers/Quizzes/AttemptQuiz";
import AnimalPhonics from "./containers/Phonics/Animal/Animals";
import "./App.css";
import Profile from "./containers/Profile/Profile";
import Alphabet from "./containers/Phonics/Alphabet/Alphabet";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/phonics" replace />} />
            <Route exact path="/phonics" element={<PhonicsPage />} />
            <Route exact path="/phonics/animal" element={<AnimalPhonics />} />
            <Route exact path="/phonics/alphabet" element={<Alphabet />} />
            <Route
              exact
              path="/phonics/animal/create"
              element={<AddAnimalPhonic />}
            />
            <Route exact path="/quizzes" element={<QuizListPage />} />
            <Route
              exact
              path="/quizzes/:quizId/attempt"
              element={<AttemptQuiz />}
            />
            <Route exact path="/quizzes/:quizId/edit" element={<EditQuiz />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
