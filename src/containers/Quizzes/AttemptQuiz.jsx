import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  IconButton,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { EmojiEvents } from "@mui/icons-material";

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  const getQuizDetails = async (quizId) => {
    const result = await axios.get(`/quiz/${quizId}`);
    setQuiz(result.data.quiz);
    const durationStr = quiz.duration;
    const durationMinutes = parseInt(durationStr, 10);
    setTimeLeft(durationMinutes * 60);
    console.log(result.data);
  };

  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId]);

  // useEffect(() => {
  //   let timer;
  //   if (timeLeft > 0) {
  //     timer = setInterval(() => {
  //       setTimeLeft((prev) => prev - 1);
  //     }, 1000);
  //   } else {
  //     setTimeUp(true);
  //   }
  //   return () => clearInterval(timer);
  // }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  console.log({ quiz });
  const handleOptionChange = (questionId, value) => {
    const updatedQuestions = quiz.questions.map((q) => {
      if (q._id === questionId) {
        return {
          ...q,
          userAttempt: value,
        };
      }
      return q;
    });

    setQuiz((q) => ({
      ...q,
      questions: updatedQuestions,
    }));
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const answers = quiz.questions.map((q) => ({
      questionId: q._id,
      answer: q.userAttempt,
    }));

    const result = await axios.post(`/quiz/${quizId}/attempt`, {
      userId: user._id,
      answers,
    });
    console.log(result);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#e3f2fd",
        minHeight: "100vh",
        // backgroundImage: `url(${Jungle})`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            color: "#156499",
            fontWeight: "bold",
          }}
        >
          Duration: {quiz?.duration}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          hehe
          {/* Time Left: {formatTime(timeLeft)} */}
        </Typography>
      </div>

      <div
        style={{
          backgroundColor: "rgb(234 130 211 / 30%)",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          fontFamily: "Comic Sans MS, cursive",
          color: "#6200ea",
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <EmojiEvents style={{ fontSize: "3rem", marginRight: "10px" }} />
        {quiz?.title}
      </div>
      {quiz?.questions.map((question, i) => (
        <Paper
          key={question._id}
          elevation={6}
          sx={{
            padding: 3,
            marginBottom: 2,
            borderRadius: 3,
            backgroundColor: "honeydew",
            "&:hover": {
              backgroundColor: "#dcedc8",
            },
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            style={{ marginBottom: "10px", color: "#156499" }}
          >
            Q#{i + 1}. {question.questionText}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              name={`question-${i}`}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              {question.options.map((option, j) => (
                <FormControlLabel
                  key={j}
                  value={option}
                  control={<Radio color="primary" />}
                  onClick={() => handleOptionChange(question._id, option)}
                  label={<Typography variant="body1">{option}</Typography>}
                  style={{ marginRight: "20px" }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      ))}
      <Button onClick={handleSave}>Submit</Button>
    </Box>
  );
};

export default AttemptQuiz;
