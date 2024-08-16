import React from "react";
import { Box, Typography, Paper, Grid, IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const QuizDetailsSidebar = ({ title, description, duration, attempts }) => (
  <Box
    sx={{
      padding: 2,
      backgroundColor: "#f4f4f4",
      borderRight: "1px solid #ccc",
      height: "100vh",
    }}
  >
    <Typography variant="h5" component="h2" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" gutterBottom>
      {description}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Duration: {duration} minutes
    </Typography>
    <Typography variant="body2" gutterBottom>
      Attempts: {attempts}
    </Typography>
  </Box>
);

const QuizQuestions = ({ questions }) => (
  <Box
    sx={{
      padding: 2,
    }}
  >
    {questions.map((question, index) => (
      <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">{question.questionText}</Typography>
        <IconButton>
          <UndoIcon />
        </IconButton>
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
        <Box sx={{ marginTop: 1 }}>
          {question.options.map((option, i) => (
            <Typography key={i} variant="body2">
              {option}
            </Typography>
          ))}
        </Box>
      </Paper>
    ))}
  </Box>
);

const QuizPage = () => {
  const quizDetails = {
    title: "Sample Quiz",
    description: "This is a sample quiz description.",
    duration: 30,
    attempts: 3,
  };

  const questions = [
    {
      questionText: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe"],
    },
    {
      questionText: "Which animal is known as the king of the jungle?",
      options: ["Lion", "Tiger", "Bear"],
    },
  ];

  return (
    <Grid container>
      <Grid item xs={4} md={4} lg={3}>
        <QuizDetailsSidebar {...quizDetails} />
      </Grid>
      <Grid item xs={8} md={8} lg={9}>
        <QuizQuestions questions={questions} />
      </Grid>
    </Grid>
  );
};

export default QuizPage;
