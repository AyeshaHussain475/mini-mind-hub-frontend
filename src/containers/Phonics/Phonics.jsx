import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  Paper,
  IconButton,
} from "@mui/material";
import Animals from "../../assets/animals.jpg";
import Alphabets from "../../assets/letters.png";
import Peoms from "../../assets/peoms.png";
import Instruments from "../../assets/instruments.jpg";
import Couting from "../../assets/couting.jpg";
import BackArrow from "../../assets/arrow.webp";

const cards = [
  {
    title: "Animal Phonics",
    image: Animals,
    route: "/phonics/animal",
    tooltip: "Learn animal sounds with phonics!",
  },
  {
    title: "Alphabet Phonics",
    image: Alphabets,
    route: "/phonics/alphabet",
    tooltip: "Master the alphabet with fun phonics!",
  },
  {
    title: "Counting Phonics",
    image: Couting,
    route: "/phonics/counting",
    tooltip: "Learn numbers with phonics!",
  },
  {
    title: "Poems",
    image: Peoms,
    route: "/phonics/poems",
    tooltip: "Enjoy phonics with poems!",
  },
  {
    title: "Instruments",
    image: Instruments,
    route: "/phonics/instrument",
    tooltip: "Discover musical instruments with phonics!",
  },
];

const MainPhonicsPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #f2f2fc, #d1eaff)",
        // minHeight: "100vh"
      }}
    >
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "#CBC3E3",
              },
            }}
            onClick={() => navigate("-1")}
          >
            <img src={BackArrow} style={{ width: "80px", height: "80px" }} />
          </IconButton>
        </div>

        <Typography
          variant="h3"
          component="div"
          style={{
            color: "brown",
            fontWeight: "bold",
            textShadow: "2px 2px 4px #ffb9f8",
            fontFamily: "'Fredoka One', cursive",
            flex: 1,
            marginLeft: "20px",
            textAlign: "center",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          Let's Learn Phonics
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {cards.map((card, index) => (
          <Paper
            key={index}
            elevation={15}
            style={{
              height: "310px",
              width: "400px",
              borderRadius: "30px",
              transition: "transform 0.3s, box-shadow 0.3s",
              overflow: "hidden",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Tooltip title={card.tooltip} arrow>
              <Card>
                <CardActionArea onClick={() => navigate(card.route)}>
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt={card.title}
                    style={{ height: "310px", objectFit: "contain" }}
                  />
                </CardActionArea>
              </Card>
            </Tooltip>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default MainPhonicsPage;
