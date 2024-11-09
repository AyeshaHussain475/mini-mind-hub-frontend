import { useRef, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Animal = ({
  title,
  imageUrl,
  audioUrl,
  description,
  id,
  refetch,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

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
    try {
      const result = await axios.delete(`animal/media/${id}`);
      console.log(result);
      if (!result) {
        toast.error("Something went wrong");
      }

      setOpen(false);
      toast.success("Animal is deleted successfully");
      if (refetch) {
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const words = description.split(" ");
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={imageUrl}
          alt="green iguana"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={getRandomColor()}
            sx={{ fontWeight: "bold" }}
          >
            {title}
            <audio ref={audioRef} src={audioUrl} />
            <IconButton aria-label="play/pause" onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {user.role === "admin" && (
        <CardActions style={{ justifyContent: "space-between" }}>
          <Button size="small" color="primary" onClick={() => setOpen(true)}>
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/phonics/animal/${id}/edit`)}
          >
            Edit
          </Button>
        </CardActions>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Animal"}</DialogTitle>
        <DialogContent>
          <img
            src={imageUrl}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "200px",
              maxHeight: "200px",
            }}
            alt="Animal"
            className="dialog-image"
          />
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the animal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDeleteAnimal(id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
