import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Banjo from "../../assets/Banjo.jpg";
import Cymbals from "../../assets/Cymbals.jpg";
import Drum from "../../assets/drum.jpg";
import Flute from "../../assets/flute.jpg";
import Harp from "../../assets/Harp.jpg";
import Trumpet from "../../assets/Trumpet.jpg";
import Card from "./Card";
import GameStart from "../../assets/GameStart.mp3";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/arrow.webp";

const cardImages = [
  { img: Banjo, matched: false },
  { img: Cymbals, matched: false },
  { img: Drum, matched: false },
  { img: Flute, matched: false },
  { img: Harp, matched: false },
  { img: Trumpet, matched: false },
];

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const hasUserWon = useMemo(() => {
    return cards.length > 0 && cards.every((c) => c.matched);
  }, [cards]);

  const shuffleCards = () => {
    playAudio();
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
      }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceOne.img && choiceTwo && choiceTwo.img) {
      setDisabled(true);
      if (choiceOne.img === choiceTwo.img) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === choiceOne.img) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("not matched");
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "860px",
        margin: "auto auto",
        textAlign: "center",
      }}
    >
      <audio src={GameStart} ref={audioRef} />

      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              color: "#464d70",
              textShadow: "2px 2px 4px rgba(255 0 0 / 30%)",
            }}
          >
            Memory Game
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              mt: "10px",
              backgroundColor: "blueViolet",
            }}
            onClick={shuffleCards}
          >
            New Game
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              mt: "10px",
              backgroundColor: "blueViolet",
            }}
            onClick={() => navigate("/games")}
          >
            Back To Games
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {cards.map((card) => {
          const isFlipped =
            card.id === choiceOne?.id ||
            card.id === choiceTwo?.id ||
            card.matched;

          return (
            <Card
              card={card}
              key={card.id}
              handleChoice={!isFlipped ? handleChoice : null}
              flipped={isFlipped}
              disabled={disabled}
            />
          );
        })}
      </Grid>
      <Typography variant="h5">Turns: {turns}</Typography>
      {hasUserWon && (
        <>
          <Dialog open={true} onClose={shuffleCards}>
            <DialogTitle>
              Congratulations! {user.firstName} You Have Won The Game
            </DialogTitle>
            <DialogActions>
              <Button onClick={shuffleCards}>New Game</Button>
              <Button onClick={() => navigate(-1)}>Back To Games</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default MemoryGame;
