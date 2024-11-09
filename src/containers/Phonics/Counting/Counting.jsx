import React, { useState } from "react";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import BackArrow from "../../../assets/arrow.webp";
import zero from "../../../assets/0.jpg";
import one from "../../../assets/1.jpg";
import two from "../../../assets/2.jpg";
import three from "../../../assets/3.jpg";
import four from "../../../assets/4.jpg";
import five from "../../../assets/5.jpg";
import six from "../../../assets/6.jpg";
import seven from "../../../assets/7.jpg";
import eight from "../../../assets/8.jpg";
import nine from "../../../assets/9.jpg";
import sound from "../../../assets/Numbers.mp4";
import { useNavigate } from "react-router-dom";

const countingCards = [
  { image: zero },
  { image: one },
  { image: two },
  { image: three },
  { image: four },
  { image: five },
  { image: six },
  { image: seven },
  { image: eight },
  { image: nine },
];

const Counting = () => {
  const [isPlaying, setIsPlaying] = useState(null);
  const navigate = useNavigate();

  const handlePoem = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{
        padding: "20px",
        background: "linear-gradient(135deg, #fbc7d4, #9796f0)",
      }}
    >
      <Grid item container>
        <Grid item>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "#CBC3E3",
              },
            }}
            onClick={() => navigate("/phonics")}
          >
            <img src={BackArrow} style={{ width: "80px", height: "80px" }} />
          </IconButton>
        </Grid>
        <Grid
          item
          style={{ marginBottom: "5px" }}
          justifyContent="center"
          xs={11}
        >
          <Typography
            variant="h3"
            component="h1"
            style={{
              color: "rgba(71, 35, 107, 1)",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Learn Counting with Us!
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ textAlign: "center", marginBottom: "30px", direction: "row" }}
      >
        <Button variant="contained" color="primary" onClick={handlePoem}>
          {isPlaying ? "Read Counting!" : "Hear me out!"}
        </Button>
      </Grid>
      {isPlaying ? (
        <video src={sound} width="600px" height="600px" controls />
      ) : (
        <video src={sound} width="600px" height="600px" controls hidden />
      )}
      {isPlaying ? (
        " "
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {countingCards.map((card, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper
                elevation={5}
                style={{
                  padding: "10px",
                  backgroundColor: "#fff5e1",
                  textAlign: "center",
                }}
              >
                <img
                  src={card.image}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "bold",
                    color: "#47236b",
                    marginTop: "10px",
                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                  }}
                >
                  {card.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Counting;
