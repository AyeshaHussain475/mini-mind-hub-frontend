import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const Home = () => {
  // const speak = (text) => {
  //   const synth = window.speechSynthesis;
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "en-US-5"; // Set language (you can change this as needed)
  //   utterance.rate = 1; // Set speed of speech
  //   synth.speak(utterance);
  // };

  // useEffect(() => {
  //   const text =
  //     "Mini Mind Hub is a super fun app where kids can learn and explore all kinds of cool things! It's like an adventure that takes you on a journey filled with exciting activities—like playing with sounds, drawing on a digital canvas, solving quizzes, and even discovering Quranic lessons. Plus, there’s story-making with AI, fun games, and tours to take you to new places—all while chatting safely with your friends! Let’s make learning fun and unforgettable!";
  //   speak(text); // Call speak function when the component loads
  // }, []);
  return (
    <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "rgba(102, 51, 153, 0.2)",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Fredoka One', cursive",
            textAlign: "center",
            fontWeight: "bold",
            color: "#8a2be2",
            textShadow: "2px 2px #dab6fc",
          }}
        >
          Welcome To Mini Mind Hub
        </Typography>

        <Typography
          sx={{
            marginTop: "25px",
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            textAlign: "center",
            lineHeight: "1.8",
            color: "#444",
            padding: "0 25px",
            fontSize: "1.2rem",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
          variant="body1"
        >
          Mini Mind Hub is a super fun app where kids can learn and explore all
          kinds of cool things! It's like an adventure that takes you on a
          journey filled with exciting activities—like playing with sounds,
          drawing on a digital canvas, solving quizzes, and even discovering
          Quranic lessons. Plus, there’s story-making with AI, fun games, and
          tours to take you to new places—all while chatting safely with your
          friends! Let’s make learning fun and unforgettable!
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
