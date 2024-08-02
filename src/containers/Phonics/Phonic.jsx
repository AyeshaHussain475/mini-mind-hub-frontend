import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";

export default function Phonic({
  title,
  imageUrl,
  audioUrl,
  description,
  type,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomColorForCard = () => {
    return getRandomColor();
  };

  const words = description.split(" ");
  return (
    <Card
      sx={{ minWidth: 350 }}
      style={{ backgroundColor: getRandomColorForCard() }}
    >
      <CardMedia component="img" height="250" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: "gold" }}>
          {words.map((word, index) => (
            <span key={index} style={{ color: getRandomColor() }}>
              {word}
              {"   "}
            </span>
          ))}
        </Typography>
        <audio ref={audioRef} src={audioUrl} />
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
}
