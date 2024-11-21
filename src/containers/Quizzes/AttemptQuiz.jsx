import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { EmojiEvents } from "@mui/icons-material";
import { toast } from "react-toastify";

const AttemptQuiz = () => {
  const navigation = useNavigate();
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [quizAttempt, setQuizAttempt] = useState(null);

  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId]);

  useEffect(() => {
    if (!quizId && !quizAttempt) return;

    const createQuizAttempt = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const result = await axios.post(`/quiz/${quizId}/attempt`, {
        userId: user._id,
        createAttempt: true,
      });
      return result;
    };

    createQuizAttempt().then((r) => setQuizAttempt(r.data?.attempt));
  }, []);

  const getQuizDetails = async (quizId) => {
    const result = await axios.get(`/quiz/${quizId}`);
    setQuiz(result.data.quiz);
  };

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
    const attemptedQuestions = quiz.questions.filter((q) => q.userAttempt);
    if (attemptedQuestions.length < quiz.questions.length) {
      toast.error("Please attempt all questions before submitting..");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const answers = quiz.questions.map((q) => ({
      questionId: q._id,
      answer: q.userAttempt,
    }));

    const result = await axios.post(`/quiz/${quizId}/attempt`, {
      userId: user._id,
      answers,
      attemptId: quizAttempt._id,
    });

    if (result.data?.attempt?._id) {
      toast.success("Quiz submitted successfully");
      navigation(-1);
    } else {
      toast.success("Failed to attempt quiz. Try again!");
    }
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
          Duration: {quiz?.duration} minutes
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
      <Box display="flex" justifyContent="flex-end">
        <Button size="large" variant="contained" onClick={handleSave}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AttemptQuiz;
