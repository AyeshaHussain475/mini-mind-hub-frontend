import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Card,
  CardContent,
  Button,
  Typography,
  Checkbox,
} from "@mui/material";
import { Delete as DeleteIcon, Replay as UndoIcon } from "@mui/icons-material";
import { AddQuestionModal } from "./AddQuestionModal";
import Loader from "../../../components/Loader";

export const QuizQuestions = ({ quiz, isLoading, handleSaveQuiz }) => {
  const [questions, setQuestions] = useState([]);
  const [isAddQuestionVisible, setAddQuestionModal] = useState(false);
  const [deletedQuestionIds, setDeletedQuestionIds] = useState([]);

  useEffect(() => {
    if (quiz && quiz.questions) {
      setQuestions(quiz.questions);
    }
  }, [quiz]);

  const handleDeleteQuestion = (questionId, index) => {
    if (!questionId) {
      // this is new question which needs to be deleted from our state only
      let newQuestions = [
        ...questions.slice(0, index),
        ...questions.slice(index + 1),
      ];
      setQuestions(newQuestions);
      return;
    }

    if (deletedQuestionIds.includes(questionId)) return;

    setDeletedQuestionIds((qIds) => [...qIds, questionId]);
  };

  const handleUndoQuestion = (questionId) => {
    const newIds = deletedQuestionIds.filter((qId) => qId !== questionId);
    setDeletedQuestionIds(newIds);
  };

  const handleToggleAllQuestions = (e) => {
    if (e.target.checked) {
      const deletedIds = quiz.questions.map((q) => q._id);
      setDeletedQuestionIds(deletedIds);
    } else {
      setDeletedQuestionIds([]);
    }
  };

  const handleToggleQuestion = (e, questionId) => {
    if (e.target.checked) {
      setDeletedQuestionIds((qIds) => [...qIds, questionId]);
    } else {
      setDeletedQuestionIds(
        deletedQuestionIds.filter((qId) => qId !== questionId)
      );
    }
  };

  const toggleAddQuestionModal = () => {
    setAddQuestionModal(!isAddQuestionVisible);
  };

  const handleAddQuestion = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
    setAddQuestionModal(!isAddQuestionVisible);
  };

  const handleSaveQuizDetails = () => {
    const newQuestions = questions.filter((q) => !q._id);

    handleSaveQuiz(deletedQuestionIds, newQuestions);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#f3e5f5",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 2,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleAddQuestionModal}
          >
            Add Question
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveQuizDetails}
          >
            Update Quiz
          </Button>
        </Box>
        <Card
          sx={{
            borderLeft: "4px solid #7b1fa2",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: 1,
          }}
        >
          <CardContent>
            <Grid container alignItems="center">
              <Grid item container xs={6} alignItems="center">
                <Checkbox
                  checked={Boolean(
                    deletedQuestionIds.length === quiz?.questions.length
                  )}
                  onClick={handleToggleAllQuestions}
                />
                <Typography fontWeight="bold">Question Statement</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography fontWeight="bold">Correct Answer</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography fontWeight="bold">Action</Typography>
              </Grid>
              <Grid item xs={12} marginBottom={1} />
              {questions.map((question, index) => {
                return (
                  <React.Fragment key={question._id}>
                    <Grid
                      item
                      container
                      xs={6}
                      alignItems="center"
                      flexWrap="nowrap"
                    >
                      <Checkbox
                        checked={Boolean(
                          deletedQuestionIds.includes(question._id)
                        )}
                        onClick={(e) => handleToggleQuestion(e, question._id)}
                      />
                      <Typography>{question.questionText}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography>{question.correctAnswer}</Typography>
                    </Grid>
                    <Grid item container xs={1} alignItems="center">
                      {deletedQuestionIds.includes(question._id) && (
                        <IconButton
                          title="Undo"
                          onClick={() => handleUndoQuestion(question._id)}
                        >
                          <UndoIcon style={{ color: "green" }} />
                        </IconButton>
                      )}
                      <IconButton
                        title="Delete Question"
                        onClick={() =>
                          handleDeleteQuestion(question._id, index)
                        }
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Box>
      {isAddQuestionVisible && (
        <AddQuestionModal
          onClose={toggleAddQuestionModal}
          handleAddQuestion={handleAddQuestion}
        />
      )}
    </>
  );
};
