import { Box, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import feature1 from "../../assets/phonics.jpg";
import feature2 from "../../assets/quiz.jpg";
import feature3 from "../../assets/games.jpg";
import feature4 from "../../assets/canvas.webp";
import feature5 from "../../assets/Quran.jpg";
import feature6 from "../../assets/deaf.jpg";
import feature7 from "../../assets/Stories.jpg";
import logo from "../../assets/logo.jpeg";
import React, { useEffect, useState } from "react";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { useNavigate } from "react-router-dom";

AOS.init({
  duration: 500,
});

const Home = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const slideAnimation = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  useEffect(() => {
    setDisable(true);

    setTimeout(() => {
      setDisable(false);
    }, 3000);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
      {disable ? (
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            minHeight: "100vh",
            // marginTop: "30px",
          }}
          initial={{ rotateX: 720, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          // data-aos="flip-up"
        >
          <img
            src={logo}
            style={{ borderRadius: "100%", width: "750px", height: "750px" }}
          />
        </motion.div>
      ) : (
        <React.Fragment>
          <Box
            sx={{
              backgroundColor: "rgba(102, 51, 153, 0.2)",
              padding: "30px",
              borderRadius: "10px",
              marginBottom: "40px",
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
              Mini Mind Hub is a super fun app where kids can learn and explore
              all kinds of cool things! It's like an adventure that takes you on
              a journey filled with exciting activities—like playing with
              sounds, drawing on a digital canvas, solving quizzes, and even
              discovering Quranic lessons. Plus, there’s story-making with AI,
              fun games, and tours to take you to new places—all while chatting
              safely with your friends! Let’s make learning fun and
              unforgettable!
            </Typography>
          </Box>
          <Grid container gap={1}>
            <Grid
              container
              item
              // spacing={3}
              alignItems="center"
              justifyContent="center"
              // style={{ background: "red" }}
              onClick={() => navigate("/phonics")}
            >
              <Grid item xs={12} md={6}>
                <motion.img
                  src={feature1}
                  alt="Phonics"
                  variants={slideAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  data-aos="fade-up"
                  style={{
                    width: "70%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <motion.div
                    variants={slideAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Fredoka One', cursive",
                        color: "#8a2be2",
                        fontWeight: "bold",
                      }}
                    >
                      Audio Learning
                    </Typography>
                  </motion.div>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "'Comic Sans MS', cursive",
                      color: "#444",
                      fontSize: "1.1rem",
                    }}
                    data-aos="fade-up"
                  >
                    Audio Learning is an amazing feature where kids can learn
                    sounds in a fun and interactive way! They can explore animal
                    sounds and learn the names of animals, discover different
                    instrument sounds and their names, master the alphabet
                    through engaging activities, practice counting with sound,
                    and enjoy fun poems. It's a fantastic, creative journey to
                    help kids develop their listening and learning skills while
                    having fun!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              container
              item
              // spacing={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate("/quizzes")}
            >
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <motion.div
                    variants={slideAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Fredoka One', cursive",
                        color: "#8a2be2",
                        fontWeight: "bold",
                      }}
                    >
                      Quiz
                    </Typography>
                  </motion.div>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "'Comic Sans MS', cursive",
                      color: "#444",
                      fontSize: "1.1rem",
                    }}
                    data-aos="fade-up"
                  >
                    The quiz section helps kids challenge themselves and learn
                    new things! They can take fun quizzes to test their
                    knowledge, solve exciting riddles to stimulate their
                    thinking, and enjoy interactive activities that keep
                    learning engaging. With a variety of topics and formats,
                    kids will love the thrill of discovery while boosting their
                    confidence and skills!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.img
                  src={feature2}
                  alt="Quiz"
                  variants={slideAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  data-aos="fade-up"
                  style={{
                    width: "70%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              // spacing={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate("/canvas")}
            >
              <Grid item xs={12} md={6}>
                <motion.img
                  src={feature4}
                  alt="Canvas"
                  variants={slideAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  data-aos="fade-up"
                  style={{
                    width: "70%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <motion.div
                    variants={slideAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Fredoka One', cursive",
                        color: "#8a2be2",
                        fontWeight: "bold",
                      }}
                    >
                      Canvas
                    </Typography>
                  </motion.div>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "'Comic Sans MS', cursive",
                      color: "#444",
                      fontSize: "1.1rem",
                    }}
                    data-aos="fade-up"
                  >
                    Kids can unleash their creativity by drawing on a digital
                    canvas! They can express themselves freely through art,
                    explore different colors and tools, and let their
                    imagination run wild. Once they’ve created their
                    masterpieces, they can save and download their art to share
                    with friends and family, making every drawing a memorable
                    experience. It's a fun way to enhance creativity while
                    enjoying the process of making art!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              container
              item
              // spacing={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate("/games")}
            >
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <motion.div
                    variants={slideAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Fredoka One', cursive",
                        color: "#8a2be2",
                        fontWeight: "bold",
                      }}
                    >
                      Games
                    </Typography>
                  </motion.div>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "'Comic Sans MS', cursive",
                      color: "#444",
                      fontSize: "1.1rem",
                    }}
                    data-aos="fade-up"
                  >
                    Fun games await kids to enhance their learning experience!
                    These interactive games are designed to make learning
                    enjoyable, helping kids develop important skills like
                    problem-solving, critical thinking, and teamwork. They can
                    dive into exciting challenges, earn rewards, and even
                    compete with friends, all while having a blast!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.img
                  src={feature3}
                  alt="Games"
                  variants={slideAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  data-aos="fade-up"
                  style={{
                    width: "70%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              // spacing={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate("/islamic")}
            >
              <Grid item xs={12} md={6}>
                <motion.img
                  src={feature5}
                  alt="Quran"
                  variants={slideAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  data-aos="fade-up"
                  style={{
                    width: "70%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <motion.div
                    variants={slideAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Fredoka One', cursive",
                        color: "#8a2be2",
                        fontWeight: "bold",
                      }}
                    >
                      Quran
                    </Typography>
                  </motion.div>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "'Comic Sans MS', cursive",
                      color: "#444",
                      fontSize: "1.1rem",
                    }}
                    data-aos="fade-up"
                  >
                    Learn Quranic lessons to strengthen your Eman and deepen
                    your understanding of faith! This section offers engaging
                    and interactive lessons that help kids explore the teachings
                    of the Quran. They'll discover stories of the Prophets,
                    learn essential verses, and understand the importance of
                    prayer and kindness in everyday life.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              container
              item
              // spacing={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate("/deaf")}
            >
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <motion.div
                    variants={slideAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Fredoka One', cursive",
                        color: "#8a2be2",
                        fontWeight: "bold",
                      }}
                    >
                      Deaf Learning Hub
                    </Typography>
                  </motion.div>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "'Comic Sans MS', cursive",
                      color: "#444",
                      fontSize: "1.1rem",
                    }}
                    data-aos="fade-up"
                  >
                    Let's educate our special and unique kids! This section
                    focuses on sign language, helping children communicate
                    effectively and learn essential skills. They can also engage
                    with quizzes tailored for them, making learning both fun and
                    accessible!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.img
                  src={feature6}
                  alt="Deaf Children"
                  variants={slideAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  data-aos="fade-up"
                  style={{
                    width: "70%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              // spacing={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate("/story")}
            >
              <Grid item xs={12} md={6}>
                <motion.img
                  src={feature7}
                  alt="Story Generation"
                  variants={slideAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  data-aos="fade-up"
                  style={{
                    width: "70%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <motion.div
                    variants={slideAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Fredoka One', cursive",
                        color: "#8a2be2",
                        fontWeight: "bold",
                      }}
                    >
                      Text-To-Story
                    </Typography>
                  </motion.div>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "'Comic Sans MS', cursive",
                      color: "#444",
                      fontSize: "1.1rem",
                    }}
                    data-aos="fade-up"
                  >
                    Turn your imagination into a story you can see and hear!
                    This section lets you create any story and brings it to life
                    with visuals and sound. Watch as your words transform into
                    an exciting adventure, making storytelling even more fun and
                    interactive!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Box>
  );
};

export default Home;
