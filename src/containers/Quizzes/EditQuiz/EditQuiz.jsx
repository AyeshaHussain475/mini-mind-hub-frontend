import React from "react";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { QuizQuestions } from "./QuizQuestions";
import { QuizDetails } from "./QuizDetails";
import { useApiData } from "../../../hooks/useApiData";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useApiData(`/quiz/${quizId}`);

  return (
    <Grid container>
      <Grid item xs={12} md={4} lg={3}>
        <QuizDetails quiz={data?.quiz} isLoading />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <QuizQuestions quiz={data?.quiz} isLoading />
      </Grid>
    </Grid>
  );
};

export default QuizPage;
