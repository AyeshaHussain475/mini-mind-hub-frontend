import React from "react";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import MemoryGame from "../../assets/memory.png";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ backgroundColor: "aliceblue", height: "100vh" }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Comic Sans MS", "Comic Sans", "cursive"',
          textAlign: "center",
          fontWeight: "bold",
          color: "#d512ff",
          textShadow: "2px 2px #000000",
          letterSpacing: "0.1em",
        }}
      >
        Games
      </Typography>
      <Grid container spacing={3} sx={{ mt: 3, padding: 3 }}>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          onClick={() => navigate("/memoryGame")}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff4e6",
              width: "450px",
            }}
          >
            <Card
              sx={{
                maxWidth: 450,
                borderRadius: "20px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardMedia
                sx={{ height: 400 }}
                image={MemoryGame}
                title="Memory Game"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: '"Comic Sans MS", "Comic Sans", "cursive"',
                    fontWeight: "bold",
                    color: "#ff4081",
                    textAlign: "center",
                  }}
                >
                  Memory Game
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Games;
