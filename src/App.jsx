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
import Counting from "./containers/Phonics/Counting/Counting";
import Canvas from "./containers/Canvas/Canvas";
import Instruments from "./containers/Phonics/Instruments/Instruments";
import AddInstrument from "./containers/Phonics/Instruments/AddInstrument";
import EditInstrument from "./containers/Phonics/Instruments/EditInstrument";
import Games from "./containers/Games/Games";
import MemoryGame from "./containers/Games/Memory Game";
import Poems from "./containers/Phonics/Poems";
import Home from "./containers/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import EditAnimal from "./containers/Phonics/Animal/EditAnimal/EditAnimal";
import Dashboard from "./containers/Dashboard/Dashboard";
import Deaf from "../src2/Deaf";
import Deaf2 from "../src2/Deaf2";
import StoryDetails from "../src2/StoryDetails";
import StoryDetails2 from "../src2/StoryDetails2";
import Story from "../src2/Story1";
import Deaf3 from "../src2/Deaf3";
import Deaf4 from "../src2/Deaf4";
import Islamic from "../src2/islamic";
import AddQuiz from "./containers/Quizzes/AddQuiz/AddQuiz";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            ss
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/phonics" replace />} />
            <Route exact path="/phonics" element={<PhonicsPage />} />
            <Route exact path="/phonics/animal" element={<AnimalPhonics />} />
            <Route exact path="/phonics/alphabet" element={<Alphabet />} />
            <Route exact path="/phonics/counting" element={<Counting />} />
            <Route exact path="/phonics/instrument" element={<Instruments />} />
            <Route
              exact
              path="/phonics/instrument/:id/edit"
              element={<EditInstrument />}
            />
            <Route
              exact
              path="/phonics/animal/:id/edit"
              element={<EditAnimal />}
            />
            <Route
              exact
              path="/phonics/instrument/create"
              element={<AddInstrument />}
            />
            <Route exact path="/canvas" element={<Canvas />} />
            <Route
              exact
              path="/phonics/animal/create"
              element={<AddAnimalPhonic />}
            />
            <Route exact path="/quizzes" element={<QuizListPage />} />
            <Route exact path="/quiz/create" element={<AddQuiz />} />
            <Route
              exact
              path="/quizzes/:quizId/attempt"
              element={<AttemptQuiz />}
            />
            <Route exact path="/quizzes/:quizId/edit" element={<EditQuiz />} />
            <Route exact path="/games" element={<Games />} />
            <Route exact path="/memoryGame" element={<MemoryGame />} />
            <Route exact path="/phonics/poems" element={<Poems />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/deaf" element={<Deaf />} />
            <Route exact path="/deaf2" element={<Deaf2 />} />
            <Route path="/islamic" element={<Islamic />} />
            <Route path="/story-details" element={<StoryDetails />} />
            <Route path="/deaf3" element={<Deaf3 />} />
            <Route path="/deaf4" element={<Deaf4 />} />
            <Route path="/story-details" element={<StoryDetails />} />
            <Route path="/story-details2" element={<StoryDetails2 />} />
            <Route path="/story" element={<Story />} />
            {/* /memoryGame */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
