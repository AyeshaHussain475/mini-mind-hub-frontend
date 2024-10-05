import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardActions,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useApiData } from "../../hooks/useApiData";
import BackArrow from "../../assets/arrow.webp";
import { useNavigate } from "react-router-dom";
import sound from "../../assets/sound1.mp3";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import emoji from "../../assets/sad.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Poems = () => {
  const poemsQuery = useApiData("/poems/media");
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateRandomColors = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * 16).toString(16);
      color += randomNum;
    }

    return color;
  };

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <div className="page-background">
      <div className="moving-circle"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(to right, rgb(230, 210, 255), rgb(225, 190, 231))",
          minHeight: "100vh",
          padding: "10px 20px",
          animation: "bg-animation 10s ease infinite",
        }}
      >
        <audio src={sound} ref={audioRef} />
        <Grid container alignItems="center" style={{ marginBottom: "20px" }}>
          <Grid item xs={1}>
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "#CBC3E3",
                },
              }}
              onClick={() => navigate("/phonics")}
            >
              <img
                src={BackArrow}
                style={{ width: "80px", height: "80px" }}
                alt="Back Arrow"
              />
            </IconButton>
          </Grid>

          <Grid item xs={10}>
            <Typography
              variant="h2"
              style={{
                fontFamily: "'Fredoka One', cursive",
                textShadow: "2px 2px 4px #ff4aff",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Poems
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} textAlign="center" justifyContent="center">
          {poemsQuery.data?.poems?.map((poem) => {
            const video = `http://localhost:7000/mini/media/${poem.video}`;

            return (
              <Grid item key={poem._id}>
                <Paper
                  elevation={8}
                  style={{
                    width: "410px",
                    borderRadius: "20px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Card sx={{ maxWidth: "410px", borderRadius: "20px" }}>
                    <CardMedia title={poem.name}>
                      <video width={410} controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </CardMedia>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: "'Fredoka One', cursive",
                          fontWeight: "bold",
                          color: generateRandomColors(),
                        }}
                      >
                        {poem.name}
                      </Typography>
                      <CardActions sx={{ gap: "10px" }}>
                        <IconButton
                          sx={{
                            backgroundColor: "#ff7043",
                            "&:hover": {
                              backgroundColor: "#ff5722",
                            },
                            borderRadius: "10px",
                          }}
                          onClick={handleClickOpen}
                        >
                          <DeleteIcon sx={{ fontSize: 25, color: "white" }} />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: "#66bb6a",
                            "&:hover": {
                              backgroundColor: "#43a047",
                            },
                            borderRadius: "10px",
                          }}
                          // onClick={() => navigate(`/phonics/instrument/${id}/edit`)}
                        >
                          <EditIcon sx={{ fontSize: 25, color: "white" }} />
                        </IconButton>
                      </CardActions>
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>
                          {`Are you sure you want to delete? ${poem.name}`}
                        </DialogTitle>
                        <DialogContent>
                          <img src={emoji} />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Disagree</Button>
                          <Button onClick={handleClose}>Agree</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Poems;
