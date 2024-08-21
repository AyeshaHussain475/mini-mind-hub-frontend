import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import A from "../../../assets/A.png";
import B from "../../../assets/B.png";
import C from "../../../assets/C.png";
import D from "../../../assets/D.png";
import E from "../../../assets/E.png";
import F from "../../../assets/F.png";
import G from "../../../assets/G.png";
import H from "../../../assets/H.png";
import I from "../../../assets/I.png";
import J from "../../../assets/J.png";
import K from "../../../assets/K.png";
import L from "../../../assets/L.png";
import M from "../../../assets/M.png";
import N from "../../../assets/N.png";
import O from "../../../assets/O.png";
import P from "../../../assets/P.png";
import Q from "../../../assets/Q.png";
import R from "../../../assets/R.png";
import S from "../../../assets/S.png";
import T from "../../../assets/T.png";
import U from "../../../assets/U.png";
import V from "../../../assets/V.png";
import W from "../../../assets/W.png";
import X from "../../../assets/X.png";
import Y from "../../../assets/Y.png";
import Z from "../../../assets/Z.png";
import sound from "../../../assets/Cheetah2.mp3";

const Alphabet = () => {
  const images = [
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
  ];

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
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
      <Grid item style={{ marginBottom: "20px" }}>
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
          Learn Alphabets with Us!
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%" }}
      >
        {images.map((image, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Paper
              elevation={5}
              style={{ padding: "10px", backgroundColor: "#fff5e1" }}
              onClick={playSound}
            >
              <img
                src={image}
                // alt={`Letter ${String.fromCharCode(65 + index)}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Alphabet;
