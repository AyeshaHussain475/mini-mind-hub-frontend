import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "../../../axios";
import { toast } from "react-toastify";

const Instrument = ({ name, image, sound, id, refetch }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`/instrument/media/${id}`);

      if (!result) {
        toast.error("Instrument is not deleted");
      }
      toast.success("Instrument is deleted successfully!");
      if (refetch) {
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "15px",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        sx={{
          height: 200,
          objectFit: "cover",
          filter: "brightness(90%)",
        }}
        component="img"
        image={image}
        title={name}
      />
      <CardContent
        sx={{
          backgroundColor: "#ffcc80",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: "'Fredoka One', cursive",
            color: "#4a4a4a",
            textAlign: "center",
          }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
        <audio ref={audioRef} src={sound} />
        <IconButton
          sx={{
            backgroundColor: "#fff176",
            "&:hover": {
              backgroundColor: "#ffd54f",
            },
          }}
          onClick={handleAudio}
        >
          {isPlaying ? (
            <PauseIcon sx={{ fontSize: 30, color: "#5c6bc0" }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 30, color: "#5c6bc0" }} />
          )}
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "#ff7043",
            "&:hover": {
              backgroundColor: "#ff5722",
            },
          }}
          onClick={() => handleDelete(id)}
        >
          <DeleteIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "#66bb6a",
            "&:hover": {
              backgroundColor: "#43a047",
            },
          }}
        >
          <EditIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Instrument;
