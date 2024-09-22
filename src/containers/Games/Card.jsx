import { Box, Grid } from "@mui/material";
import Cover from "../../assets/CoverGame.jpg";
import React, { useRef } from "react";
import flippedSound from "../../assets/flipSound.mp3";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const audioRef = useRef(null);
  const handleClick = () => {
    if (!disabled) {
      audioRef.current.play();
      handleChoice(card);
    }
  };

  return (
    <Grid item xs={3} key={card.id}>
      <Box
        sx={{
          perspective: "1000px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "200px",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(0deg)" : "rotateY(180deg)",
            transition: "transform 0.6s",
          }}
          onClick={handleClick}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <audio src={flippedSound} ref={audioRef} />
            <img
              src={card.img}
              alt="Card Front"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={Cover}
              alt="Card Cover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Card;
