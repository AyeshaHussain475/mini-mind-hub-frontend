import { useEffect, useState } from "react";
import axios from "../../axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import "./styles.css";
import QuizPic from "../../assets/takequiz.jpg";
import quizTime from "../../assets/partypopper.jpg";
import { useNavigate } from "react-router-dom";

const QuizListPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    const result = await axios.get("/quiz");
    console.log(result.data.quizzes, "Quizzes");
    setQuizzes(result.data.quizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const handleClick = (id) => {
    console.log(id, "iddd");
    navigate(`/quiz/${id}`);
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
      <Grid container spacing={4}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz._id}>
            <Box
              sx={{
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
              <Box sx={{ padding: 2, textAlign: "center" }}>
                <img
                  src={QuizPic}
                  alt="Quiz"
                  style={{ width: "100%", borderRadius: "10px 10px 0 0" }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#ff4081", paddingTop: 2 }}
                >
                  {quiz.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ padding: "10px 0" }}
                >
                  {quiz.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(quiz._id)}
                >
                  Start Quiz
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuizListPage;
