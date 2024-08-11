import { useEffect, useState } from "react";
import axios from "../../axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import "./styles.css";
import QuizPic from "../../assets/takequiz.jpg";
import Q from "../../assets/QQ.webp";
import U from "../../assets/U.png";
import I from "../../assets/I.png";
import Z from "../../assets/Z.webp";
import E from "../../assets/e.png";
import S from "../../assets/S.webp";
import circle from "../../assets/circle.png";
import trinagle from "../../assets/square.png";
import square from "../../assets/squaree.png";
import quizTime from "../../assets/Quiz2.jpg";
import { useNavigate } from "react-router-dom";

const QuizListPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [showContent, setShowContent] = useState(false); // State to control content visibility

  const getQuizzes = async () => {
    const result = await axios.get("/quiz");
    console.log(result.data.quizzes, "Quizzes");
    setQuizzes(result.data.quizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true); // Show content after 3 seconds (or the GIF duration)
    }, 500); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleClick = (id) => {
    console.log(id, "iddd");
    navigate(`/quiz/${id}`);
  };

  return (
    <Box>
      {!showContent && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={quizTime}
            alt="Quiz Time"
            style={{ width: "40%", height: "40%" }}
          />
        </Box>
      )}
      {showContent && (
        <Box>
          <Typography
            className="animatedText"
            style={{ fontSize: "xx-large", textAlign: "center" }}
          >
            Fun Quiz Time
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img src={QuizPic} style={{ width: "500px" }} />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={circle}
                style={{ width: "120px", marginBottom: "20px" }}
              />
              <img src={trinagle} style={{ width: "120px" }} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" gutterBottom>
                <img src={Q} style={{ width: "40px" }} />
                <img src={U} style={{ width: "40px" }} />
                <img src={I} style={{ width: "40px" }} />
                <img src={Z} style={{ width: "40px" }} />
                <img src={Z} style={{ width: "40px" }} />
                <img src={E} style={{ width: "40px" }} />
                <img src={S} style={{ width: "40px" }} />
              </Typography>
              {quizzes.map((quiz) => (
                <Button
                  key={quiz._id}
                  variant="h6"
                  onClick={() => handleClick(quiz._id)}
                >
                  {quiz.title}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default QuizListPage;
