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
  Delete,
} from "@mui/icons-material";
import axios from "../../axios";
import { toast } from "react-toastify";

export default function Phonic({
  title,
  imageUrl,
  audioUrl,
  description,
  type,
  id,
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

  const handleDeleteAnimal = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this animal?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const result = await axios.delete(`animal/media/${id}`);
      console.log(result);
      if (!result) {
        toast.error("Something went wrong");
      }
      toast.success("Animal is deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const words = description.split(" ");
  return (
    <Card
      sx={{ minWidth: 350 }}
      style={{ backgroundColor: getRandomColorForCard() }}
    >
      <CardMedia component="img" height="250" image={imageUrl} alt={title} />
      <Delete
        style={{ cursor: "pointer" }}
        onClick={() => handleDeleteAnimal(id)}
      />
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
