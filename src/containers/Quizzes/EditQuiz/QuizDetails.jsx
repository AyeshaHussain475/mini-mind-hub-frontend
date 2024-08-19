import React from "react";
import {
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { KeyboardBackspace as NavigateBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const QuizDetails = ({
  quiz,
  isLoading,
  title,
  description,
  attempts,
  duration,
  setTitle,
  setAttempts,
  setDescription,
  setDuration,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Stack spacing={1} mt={6} p={2} gap={2}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="rounded" width={"100%"} height={40} />
        <Skeleton variant="rounded" width={"100%"} height={80} />
        <Skeleton variant="rounded" width={"100%"} height={40} />
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Stack>
    );
  }

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
      <div>
        <IconButton title="Go Back" onClick={() => navigate("/quizzes")}>
          <NavigateBackIcon />
        </IconButton>
      </div>
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
