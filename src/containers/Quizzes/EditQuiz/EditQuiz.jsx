import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { QuizQuestions } from "./QuizQuestions";
import { QuizDetails } from "./QuizDetails";
import { useApiData } from "../../../hooks/useApiData";
import axios from "../../../axios";
import { toast } from "react-toastify";

const EditQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useApiData(`/quiz/${quizId}`);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [attempts, setAttempts] = useState("");
  const [description, setDescription] = useState("");
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    if (data && data.quiz) {
      setTitle(data.quiz.title);
      setDuration(data.quiz.duration);
      setAttempts(data.quiz.attempts);
      setDescription(data.quiz.description);
    }
  }, [data]);

  const handleSaveQuiz = async (deletedQuestionIds, newQuestions) => {
    setActionInProgress(true);
    try {
      const result = await axios.put(`/quiz/${quizId}`, {
        title,
        description,
        duration,
        attempts,
        deletedQuestionIds,
        newQuestions,
      });

      if (result.status === 200) {
        toast.success("Quiz updated successfully!");
        navigate("/quizzes");
      } else {
        toast.error("Failed to update quiz!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update quiz!");
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4} lg={3}>
        <QuizDetails
          isLoading={isLoading || actionInProgress}
          quiz={data?.quiz}
          title={title}
          description={description}
          duration={duration}
          attempts={attempts}
          setTitle={setTitle}
          setDescription={setDescription}
          setDuration={setDuration}
          setAttempts={setAttempts}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <QuizQuestions
          quiz={data?.quiz}
          isLoading={isLoading || actionInProgress}
          handleSaveQuiz={handleSaveQuiz}
        />
      </Grid>
    </Grid>
  );
};

export default EditQuiz;
