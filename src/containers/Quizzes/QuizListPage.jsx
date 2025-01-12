import { useEffect, useState } from "react";
import axios from "../../axios";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import QuizPic from "../../assets/takequiz2.webp";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {
  Delete as DeleteIcon,
  Verified as VerifiedIcon,
  NewReleases as ErrorIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import BackArrow from "../../assets/arrow.webp";
import { toast } from "react-toastify";

const QuizListPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    const result = await axios.get("/quiz");
    setQuizzes(result.data.quizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const handleQuiz = (quiz) => {
    if (quiz.attemptsRemaining === 0 || quiz.hasPassed) return;

    // quiz.attemptsRemaining = quiz.attemptsRemaining - 1;
    navigate(`/quizzes/${quiz._id}/attempt`);
  };

  const deleteQuiz = async (title) => {
    try {
      const result = await axios.delete("/quiz", { data: { title } });
      if (result.status === 200) {
        toast.success("Quiz deleted successfully!");
        getQuizzes();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the quiz.");
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "rgba(102, 51, 153, 0.2)",
        minHeight: "100vh",
        // backgroundImage: `url(${quizTime})`,
        backgroundSize: "cover",
      }}
    >
      <Grid container>
        <Grid item>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "#CBC3E3",
              },
            }}
            onClick={() => navigate("/")}
          >
            <img src={BackArrow} style={{ width: "80px", height: "80px" }} />
          </IconButton>
        </Grid>
        <Grid item xs={11} justifyContent="center">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontFamily: "'Comic Sans MS', cursive",
              color: "#ff4081",
              fontWeight: "bold",
              paddingBottom: 3,
            }}
          >
            Fun Quiz Time
          </Typography>
        </Grid>
        {user.role === "admin" && (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() => navigate("/quiz/create")}
              >
                Add Quiz
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2}>
        {quizzes.map((quiz) => {
          const hasAttemptedQuiz =
            Number(quiz.attempts) !== Number(quiz.attemptsRemaining);
          return (
            <Grid item xs={6} sm={6} md={3} key={quiz._id}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#fce4ec",
                  },
                }}
              >
                <Box sx={{ padding: 1, textAlign: "center" }}>
                  <img
                    src={QuizPic}
                    alt="Quiz"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#ff4081",
                      paddingTop: 2,
                    }}
                  >
                    {quiz.title}
                    {user.role === "admin" && (
                      <>
                        <EditIcon
                          sx={{
                            cursor: "pointer",
                            color: "#ff4081",
                            marginLeft: 1,
                          }}
                          onClick={() => navigate(`/quizzes/${quiz._id}/edit`)}
                        />
                        <DeleteIcon
                          sx={{
                            cursor: "pointer",
                            color: "red",
                            marginLeft: 1,
                          }}
                          onClick={() => deleteQuiz(quiz.title)}
                        />
                      </>
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ padding: "10px 0" }}
                  >
                    {quiz.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#e0f7fa",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      marginBottom: "10px",
                    }}
                  >
                    Attempts Left: {quiz.attemptsRemaining}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "5px",
                      gap: 1,
                    }}
                  >
                    {!hasAttemptedQuiz ? (
                      <>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", color: "#9e9e9e" }}
                        >
                          Not Attempted
                        </Typography>
                        <HelpOutlineIcon sx={{ color: "#9e9e9e" }} />{" "}
                      </>
                    ) : quiz.hasPassed ? (
                      <>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="green"
                        >
                          Passed
                        </Typography>
                        <VerifiedIcon sx={{ color: "#4caf50" }} />
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="green"
                        >
                          Score {quiz.percentage.toFixed(2)}%
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", color: "#f44336" }}
                        >
                          Failed
                        </Typography>
                        <ErrorIcon sx={{ color: "#f44336" }} />
                      </>
                    )}
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleQuiz(quiz)}
                  disabled={quiz.attemptsRemaining === 0 || quiz.hasPassed}
                  sx={{ margin: "0 auto 10px" }}
                >
                  Start Quiz
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default QuizListPage;
