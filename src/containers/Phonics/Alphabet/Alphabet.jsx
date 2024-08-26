import React, { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
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
import a from "../../../assets/a.jpeg";
import b from "../../../assets/b.jpeg";
import c from "../../../assets/c.jpeg";
import d from "../../../assets/d.jpeg";
import e from "../../../assets/e.jpeg";
import f from "../../../assets/f.jpeg";
import g from "../../../assets/g.jpeg";
import h from "../../../assets/h.jpeg";
import i from "../../../assets/i.jpeg";
import j from "../../../assets/j.jpeg";
import k from "../../../assets/k.jpeg";
import l from "../../../assets/l.jpeg";
import m from "../../../assets/m.jpeg";
import n from "../../../assets/n.jpeg";
import o from "../../../assets/o.jpeg";
import p from "../../../assets/p.jpeg";
import q from "../../../assets/q.jpeg";
import r from "../../../assets/r.jpeg";
import s from "../../../assets/s.jpeg";
import t from "../../../assets/t.jpeg";
import u from "../../../assets/u.jpeg";
import v from "../../../assets/v.jpeg";
import w from "../../../assets/w.jpeg";
import x from "../../../assets/x.jpeg";
import y from "../../../assets/y.jpeg";
import z from "../../../assets/z.jpeg";

import sound from "../../../assets/Cheetah2.mp3";

const Alphabet = () => {
  const [images, setImages] = useState([
    { id: 1, front: A, back: a, flip: false },
    { id: 2, front: B, back: b, flip: false },
    { id: 3, front: C, back: c, flip: false },
    { id: 4, front: D, back: d, flip: false },
    { id: 5, front: E, back: e, flip: false },
    { id: 6, front: F, back: f, flip: false },
    { id: 7, front: G, back: g, flip: false },
    { id: 8, front: H, back: h, flip: false },
    { id: 9, front: I, back: i, flip: false },
    { id: 10, front: J, back: j, flip: false },
    { id: 11, front: K, back: k, flip: false },
    { id: 12, front: L, back: l, flip: false },
    { id: 13, front: M, back: m, flip: false },
    { id: 14, front: N, back: n, flip: false },
    { id: 15, front: O, back: o, flip: false },
    { id: 16, front: P, back: p, flip: false },
    { id: 17, front: Q, back: q, flip: false },
    { id: 18, front: R, back: r, flip: false },
    { id: 19, front: S, back: s, flip: false },
    { id: 20, front: T, back: t, flip: false },
    { id: 21, front: U, back: u, flip: false },
    { id: 22, front: V, back: v, flip: false },
    { id: 23, front: W, back: w, flip: false },
    { id: 24, front: X, back: x, flip: false },
    { id: 25, front: Y, back: y, flip: false },
    { id: 26, front: Z, back: z, flip: false },
  ]);

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleSave = (image) => {
    setImages(
      images.map((img) => {
        if (img.id === image.id) {
          return { ...img, flip: !img.flip };
        }
        return img;
      })
    );
  };

  const handleAllFlip = () => {
    setImages(
      images.map((img) => {
        return { ...img, flip: !img.flip };
      })
    );
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
      <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button onClick={handleAllFlip} variant="contained" color="primary">
          Click me and see the magic!
        </Button>
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
              onClick={() => handleSave(image)}
            >
              <img
                src={image.flip ? image.back : image.front}
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
