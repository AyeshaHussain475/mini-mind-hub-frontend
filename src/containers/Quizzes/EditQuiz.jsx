import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom/dist";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";

const EditQuiz = () => {
  const { quizId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [attempts, setAttempts] = useState("");

  console.log(quizId);

  const getQuiz = async (quizId) => {
    try {
      const result = await axios.get(`/quiz/${quizId}`);
      console.log(result);
      setTitle(result.data.quiz.title);
      setDescription(result.data.quiz.description);
      setDuration(result.data.quiz.duration);
      setAttempts(result.data.quiz.attempts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuiz(quizId);
  }, [quizId]);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title || !duration || !description || !attempts) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const updateQuiz = await axios.put(`/quiz/${quizId}`, {
        title,
        description,
        attempts,
        duration,
      });

      if (!updateQuiz) {
        toast.error("Error while uploading the quiz!");
      }
      toast.success("Quiz has been updated successfully");

      setTitle("");
      setDescription("");
      setAttempts("");
      setDuration("");

      navigate(-1);
    } catch (error) {
      toast.error("An error occured while uploading the quiz");
      console.log("Error uploading the quiz", error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f3e5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={4} sx={{ padding: 3, maxWidth: 600, width: "100%" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: "'Comic Sans MS', cursive",
            color: "#7b1fa2",
            fontWeight: "bold",
            paddingBottom: 2,
          }}
        >
          Edit Quiz
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Quiz Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#7b1fa2",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#7b1fa2",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration (minutes)"
              variant="outlined"
              type="number"
              fullWidth
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#7b1fa2",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Attempts"
              variant="outlined"
              type="number"
              value={attempts}
              onChange={(e) => setAttempts(e.target.value)}
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#7b1fa2",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ marginRight: 2 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ marginRight: 2 }}
            >
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary">
              Update Questions
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EditQuiz;
