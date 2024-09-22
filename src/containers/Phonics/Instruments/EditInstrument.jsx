import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import backgroundImage from "../../../assets/drum.jpg";
import { useEffect, useRef, useState } from "react";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../../assets/arrow.webp";
import {
  Audiotrack as AudiotrackIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";

const EditInstrument = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [sound, setSound] = useState("");
  const [soundUrl, setSoundUrl] = useState("");
  const [soundFile, setSoundFile] = useState("");
  const [imageFile, setImageFile] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };
  const navigate = useNavigate();
  const { id } = useParams();

  const getInstrument = async (id) => {
    const result = await axios.get(`/instrument/media/${id}`);

    setName(result.data.instrument.name);
    setSound(result.data.instrument.sound);
    setImgUrl(
      `http://localhost:7000/mini/media/${result.data.instrument.image}`
    );
    setImageFile(
      `http://localhost:7000/mini/media/${result.data.instrument.image}`
    );
    setImage(result.data.instrument.image);
    setSoundUrl(
      `http://localhost:7000/mini/media/${result.data.instrument.sound}`
    );
    setSoundFile(
      `http://localhost:7000/mini/media/${result.data.instrument.sound}`
    );
    console.log(result);
  };

  const handleSubmit = async () => {
    if (!name || !imageFile || !soundFile) {
      toast.warning("Fill the missing enteries");
      return;
    }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", imageFile);
    formData.append("sound", soundFile);

    try {
      const result = await axios.put(`/instrument/media/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.status === 200) {
        toast.success("Instrument is created successfully");
        navigate("/phonics/instrument");
      } else {
        toast.error("Failed to create! Try again!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  console.log(imgUrl, "image Url");
  useEffect(() => {
    getInstrument(id);
  }, [id]);

  return (
    <Box
      component="form"
      style={{
        marginLeft: "10%",
        marginTop: "1%",
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <>
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "#CBC3E3",
            },
          }}
          onClick={() => navigate("/phonics/instrument")}
        >
          <img src={BackArrow} style={{ width: "80px", height: "80px" }} />
        </IconButton>
      </>
      <Typography
        style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "2.0rem",
          color: "black",
          textShadow: "2px 2px 5px purple",
        }}
      >
        Update Instrument
      </Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            required
            name="name"
            value={name}
            label="Add Instrument"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <InputLabel htmlFor="sound-upload">Sound</InputLabel>
          <Button
            variant="contained"
            component="label"
            sx={{ textTransform: "none" }}
            startIcon={<AudiotrackIcon />}
          >
            Select Sound
            <input
              type="file"
              hidden
              accept="audio/*"
              name="sound"
              id="sound-upload"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const files = e.target.files[0];
                  setSoundUrl(URL.createObjectURL(files));
                  setSound(files.name);
                  setSoundFile(files);
                }
              }}
            />
          </Button>

          {soundUrl && (
            <Grid>
              <span style={{ marginLeft: "8px" }}>{sound}</span>
              <audio ref={audioRef} src={soundUrl} />
              {isPlaying ? (
                <IconButton onClick={handleAudio}>
                  <PauseIcon sx={{ fontSize: 30, color: "#5c6bc0" }} />
                </IconButton>
              ) : (
                <IconButton onClick={handleAudio}>
                  <PlayArrowIcon sx={{ fontSize: 30, color: "#5c6bc0" }} />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  setSoundUrl("");
                  setSound("");
                }}
              >
                <CloseIcon style={{ color: "red" }} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={8}>
          <InputLabel htmlFor="image-upload">Image</InputLabel>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            component="label"
            sx={{ textTransform: "none" }}
            startIcon={<ImageIcon />}
          >
            Select Image
            <input
              hidden
              type="file"
              accept="image/*"
              name="sound"
              id="image-upload"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setImgUrl(URL.createObjectURL(file));
                  setImage(file.name);
                  setImageFile(file);
                }
              }}
            />
          </Button>
          {imgUrl && (
            <Grid container mt={3}>
              <img src={imgUrl} width={50} height={50} />
              <span style={{ marginLeft: "8px" }}>{image}</span>
              <IconButton
                onClick={() => {
                  setImgUrl("");
                  setImage("");
                }}
              >
                <CloseIcon style={{ color: "red" }} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container xs={8} mt={10} alignItems="center" marginLeft={30}>
        <Grid item>
          <Button
            variant="contained"
            style={{ borderRadius: "20px" }}
            onClick={handleSubmit}
          >
            Update Instrument
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditInstrument;
