import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Banjo from "../../assets/Banjo.jpg";
import Cymbals from "../../assets/Cymbals.jpg";
import Drum from "../../assets/drum.jpg";
import Flute from "../../assets/flute.jpg";
import Harp from "../../assets/Harp.jpg";
import Trumpet from "../../assets/Trumpet.jpg";
import Card from "./Card";
import GameStart from "../../assets/GameStart.mp3";

const cardImages = [
  { img: Banjo, matched: false },
  { img: Cymbals, matched: false },
  { img: Drum, matched: false },
  { img: Flute, matched: false },
  { img: Harp, matched: false },
  { img: Trumpet, matched: false },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const shuffleCards = () => {
    playAudio();
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    console.log(card, "clicked");
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceOne.img && choiceTwo && choiceTwo.img) {
      setDisabled(true);
      if (choiceOne.img === choiceTwo.img) {
        console.log("matched", choiceOne.img, choiceTwo.img);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === choiceOne.img) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurn) => prevTurn + 1);
        setDisabled(false);
      } else {
        console.log("not matched");
        setTimeout(() => {
          setChoiceOne(null);
          setChoiceTwo(null);
          setTurns((prevTurn) => prevTurn + 1);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  // useEffect(() => {
  //   cards.forEach((card) => {
  //     if (card.matched === true) {
  //       console.log("all matched!");
  //     }
  //     shuffleCards();
  //   });
  // }, []);

  return (
    <Box
      sx={{
        maxWidth: "860px",
        margin: "5px auto",
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
          {" "}
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
      </Grid>

      {/* Grid for displaying cards */}
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </Grid>
      <Typography variant="h5">Turns: {turns}</Typography>
    </Box>
  );
};

export default MemoryGame;
