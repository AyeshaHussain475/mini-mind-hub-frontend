import {
  Grid,
  IconButton,
  InputLabel,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import ReactPainter from "react-painter";
import { ColorLens } from "@mui/icons-material";
import pallete from "../../assets/pallete.jpg";
import eraser from "../../assets/eraser.jpg";
import BackArrow from "../../assets/arrow.webp";
import { useNavigate } from "react-router-dom";

const Canvas = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#e6e6fa",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${pallete})`,
      }}
    >
      <ReactPainter
        width={1200}
        height={600}
        render={({
          canvas,
          triggerSave,
          setColor,
          setLineWidth,
          setLineCap,
          setLineJoin,
          imageDownloadUrl,
        }) => (
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              // width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgb(221 214 214)",
            }}
          >
            <Grid
              container
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              textAlign="center"
              direction="column"
            >
              <Grid container>
                <Grid item>
                  <IconButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "#CBC3E3",
                      },
                    }}
                    onClick={() => navigate("/")}
                  >
                    <img
                      src={BackArrow}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </IconButton>
                </Grid>

                <Grid item xs={10}>
                  <Typography
                    variant="h3"
                    style={{
                      marginBottom: "16px",
                      fontSize: "3rem",
                      fontWeight: "bold",
                      color: "#ff6347", // Bright tomato color
                      textShadow: "3px 3px 0 #fff, 6px 6px 0 #ffeb3b", // Shadow with a playful yellow
                      fontFamily: "'Comic Sans MS', cursive, sans-serif", // Fun, child-friendly font
                      textAlign: "center",
                      lineHeight: "1.2",
                    }}
                  >
                    Play with Paints
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item gap={2} justifyContent="center">
                <Grid item xs>
                  <InputLabel style={{ marginBottom: "6px" }}>
                    Brush Color
                  </InputLabel>
                  <IconButton>
                    <ColorLens />
                  </IconButton>
                  <input
                    type="color"
                    id="color-picker"
                    onChange={(e) => setColor(e.target.value)}
                  />
                </Grid>
                <Grid item xs>
                  <InputLabel style={{ marginBottom: "6px" }}>
                    Eraser
                  </InputLabel>
                  <Grid
                    container
                    item
                    direction="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Grid item xs>
                      <img
                        src={eraser}
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        defaultValue={1}
                        min={1}
                        max={50}
                        onChange={(e) => {
                          setLineWidth(e.target.value);
                          setColor("ghostwhite");
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <InputLabel style={{ marginBottom: "6px" }}>
                    Brush Size
                  </InputLabel>
                  <Slider
                    defaultValue={1}
                    min={1}
                    max={50}
                    onChange={(e) => setLineWidth(e.target.value)}
                    aria-labelledby="brush-size-slider"
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item xs>
                  <InputLabel>Line Join</InputLabel>
                  <Select
                    defaultValue="round"
                    onChange={(e) => setLineJoin(e.target.value)}
                    label="Line Join"
                  >
                    <MenuItem value="round">Round</MenuItem>
                    <MenuItem value="bevel">Bevel</MenuItem>
                    <MenuItem value="miter">Miter</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs>
                  <InputLabel>Line Cap</InputLabel>
                  <Select
                    defaultValue="round"
                    onChange={(e) => setLineCap(e.target.value)}
                    label="Line Cap"
                  >
                    <MenuItem value="round">Round</MenuItem>
                    <MenuItem value="butt">Butt</MenuItem>
                    <MenuItem value="square">Square</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: "16px" }}>
                {imageDownloadUrl ? (
                  <Button
                    variant="contained"
                    color="primary"
                    href={imageDownloadUrl}
                    download="my-drawing.png"
                  >
                    Download
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={triggerSave}
                  >
                    Save
                  </Button>
                )}
              </Grid>

              <Grid
                item
                style={{
                  marginTop: "16px",
                  backgroundColor: "ghostwhite",
                  border: "1px solid grey",
                }}
              >
                <div style={{ width: "100%", height: "100%" }}>{canvas}</div>
              </Grid>
            </Grid>
          </Paper>
        )}
      />
    </div>
  );
};

export default Canvas;
