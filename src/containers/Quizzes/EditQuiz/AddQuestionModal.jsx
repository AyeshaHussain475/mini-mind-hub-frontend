import { useState, Fragment } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  Typography,
  Grid,
  Stack,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const AddQuestionModal = ({ onClose, handleAddQuestion }) => {
  const { quizId } = useParams();
  const [statement, setStatement] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleCorrectAnswer = (e, value) => {
    if (e.target.checked) {
      setCorrectAnswer(value);
    } else {
      setCorrectAnswer("");
    }
  };

  const handleAddNewQuestion = () => {
    if (
      !statement ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctAnswer
    ) {
      toast.warning("Please fill in required fields");
      return;
    }

    handleAddQuestion({
      quizId,
      questionText: statement,
      options: [option1, option2, option3, option4],
      correctAnswer,
    });
  };

  return (
    <Fragment>
      <BootstrapDialog
        onClose={onClose}
        open
        fullWidth
        maxWidth="md"
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Question
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Question Statement"
              required
              multiline
              minRows={3}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
            />
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  required
                  label="Option 1"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                />
              </Grid>
              <Grid item container xs={4} alignItems="center">
                <Checkbox
                  checked={correctAnswer && correctAnswer === option1}
                  onChange={(e) => handleCorrectAnswer(e, option1)}
                />
                <Typography>Correct Answer</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  required
                  label="Option 2"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                />
              </Grid>
              <Grid item container xs={4} alignItems="center">
                <Checkbox
                  checked={correctAnswer && correctAnswer === option2}
                  onChange={(e) => handleCorrectAnswer(e, option2)}
                />
                <Typography>Correct Answer</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  required
                  label="Option 3"
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                />
              </Grid>
              <Grid item container xs={4} alignItems="center">
                <Checkbox
                  checked={correctAnswer && correctAnswer === option3}
                  onChange={(e) => handleCorrectAnswer(e, option3)}
                />
                <Typography>Correct Answer</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  required
                  label="Option 4"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                />
              </Grid>
              <Grid item container xs={4} alignItems="center">
                <Checkbox
                  checked={correctAnswer && correctAnswer === option4}
                  onChange={(e) => handleCorrectAnswer(e, option4)}
                />
                <Typography>Correct Answer</Typography>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleAddNewQuestion}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
};
