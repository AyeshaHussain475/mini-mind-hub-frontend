import React, { useEffect, useState } from "react";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";

export const QuizDetails = ({ quiz, isLoading }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [attempts, setAttempts] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDuration(quiz.duration);
      setAttempts(quiz.attempts);
      setDescription(quiz.description);
    }
  }, [quiz]);

  return (
    <Stack
      gap={2}
      sx={{
        padding: 3,
        // backgroundColor: "#e1bee7",
        borderRight: "2px solid #7b1fa2",
        height: "100vh",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" mb={1}>
        Update Quiz Details
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Duration (minutes)"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Attempts"
        type="number"
        value={attempts}
        onChange={(e) => setAttempts(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </Stack>
  );
};
