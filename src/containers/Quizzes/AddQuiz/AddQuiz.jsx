import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddQuiz() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    duration: "",
    attempts: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/quiz", {
        title: quizData.title,
        description: quizData.description,
        duration: quizData.duration,
        attempts: quizData.attempts,
      });

      if (result.status === 200) {
        toast.success("Quiz is created successfully!");
        setTimeout(() => {
          navigate("/quizzes");
        }, [1000]);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    console.log(quizData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create a New Quiz
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Title"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={quizData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Duration (in minutes)"
            name="duration"
            type="number"
            value={quizData.duration}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Attempts Allowed"
            name="attempts"
            type="number"
            value={quizData.attempts}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onSubmit={handleSubmit}
          >
            Create Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddQuiz;
