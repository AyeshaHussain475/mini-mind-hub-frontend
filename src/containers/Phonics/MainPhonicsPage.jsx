import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import Animals from "../../assets/animals.jpg";
import Alphabets from "../../assets/alphabets.jpg";
import Peoms from "../../assets/peoms.png";
import Instruments from "../../assets/instruments.jpg";
import Couting from "../../assets/couting.jpg";

const cards = [
  {
    title: "Animal Phonics",
    image: Animals,
    route: "/phonics",
    tooltip: "This is an Animal Phonic",
  },
  {
    title: "Alphabet Phonics",
    image: Alphabets,
    route: "/animal-phonics",
    tooltip: "This is an Alphabet Phonic",
  },
  {
    title: "Counting Phonics",
    image: Couting,
    route: "/animal-phonics",
    tooltip: "This is an Alphabet Phonic",
  },
  {
    title: "Poems",
    image: Peoms,
    route: "/animal-phonics",
    tooltip: "This is an Alphabet Phonic",
  },
  {
    title: "Instruments",
    image: Instruments,
    route: "/animal-phonics",
    tooltip: "This is an Alphabet Phonic",
  },
];

const MainPhonicsPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {cards.map((card, index) => (
        <Tooltip title={card.tooltip} key={index} arrow>
          <Card sx={{ maxWidth: 250, minWidth: 200 }}>
            <CardActionArea onClick={() => navigate(card.route)}>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Tooltip>
      ))}
    </div>
  );
};

export default MainPhonicsPage;
