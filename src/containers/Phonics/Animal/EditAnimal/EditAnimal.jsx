import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiData } from "../../../../hooks/useApiData";
import axios from "../../../../axios";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { label } from "framer-motion/client";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { Close as CloseIcon } from "@mui/icons-material";
import BackArrow from "../../../../assets/arrow.webp";
const EditAnimal = () => {
  // isPrimary work is not done yet M
  const { id } = useParams();
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [sound, setSound] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [soundName, setSoundName] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundFile, setSoundFile] = useState("");

  const animalTypes = [
    { label: "Mammal", value: "mammals" },
    { label: "Reptile", value: "reptiles" },
    { label: "Birds", value: "birds" },
    { label: "Fish", value: "fish" },
  ];

  const audioRef = useRef(null);

  const handleAudio = () => {
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };

  const getAnimal = async () => {
    const result = await axios.get(`/animal/media/${id}`);
    console.log(result.data, "animal data");
    setName(result.data.animal.name);
    setImages(
      `http://localhost:7000/mini/media/${result.data.animal.images[0].name}`
    );
    setImageFile(
      `http://localhost:7000/mini/media/${result.data.animal.images[0]}`
    );
    setImageName(result.data.animal.images[0].name);
    setSoundName(result.data.animal.sound); //soundName
    setSound(`http://localhost:7000/mini/media/${result.data.animal.sound}`);
    setSoundFile(
      `http://localhost:7000/mini/media/${result.data.animal.sound}`
    ); //retriving that sound from this url
    setDescription(result.data.animal.description);
    setType(result.data.animal.type);
  };

  const navigate = useNavigate();

  const editAnimal = async () => {
    if (!name || !soundFile || !imageFile || !type || !description) {
      toast.warning("Fill the missing enteries!");
      return;
    }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("sound", soundFile);
    formData.append("images", imageFile);
    formData.append("type", type);
    formData.append("description", description);

    try {
      const res = await axios.put(`animal/media/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Animal is updated sucessfully");
        setTimeout(() => {
          navigate("/phonics/animal");
        }, 2000);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAnimal();
  }, [id]);

  return (
    <Box
      component="form"
      style={{
        marginLeft: "10%",
      }}
    >
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "#CBC3E3",
          },
        }}
        onClick={() => navigate("/phonics/animal")}
      >
        <img src={BackArrow} style={{ width: "80px", height: "80px" }} />
      </IconButton>
      <Typography
        style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "2.0rem",
          color: "black",
          textShadow: "2px 2px 5px purple",
          marginBottom: "15px",
        }}
      >
        Edit Animal
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            required
            fullWidth
            name="name"
            label="Animal Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            multiline
            rows={3}
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              label="Type"
              labelId="type-label"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {animalTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <InputLabel htmlFor="sound-upload">Sound</InputLabel>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              component="label"
              sx={{ textTransform: "none" }}
            >
              Select File
              <input
                hidden
                type="file"
                accept="audio/*"
                name="sound"
                id="sound-upload"
                onChange={(e) => {
                  setSound(URL.createObjectURL(e.target.files[0]));
                  //URL.createObjectURL only for displaying
                  //the sound at the browser.
                  setSoundName(e.target.files[0].name);
                  setSoundFile(e.target.files[0]);
                }}
              />
            </Button>
            {sound && (
              <>
                <span style={{ marginLeft: 8 }}>{soundName}</span>
                <audio ref={audioRef} src={sound} />
                {isPlaying ? (
                  <IconButton onClick={handleAudio}>
                    <PlayArrowIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleAudio}>
                    <PauseIcon />
                  </IconButton>
                )}
                <IconButton
                  sx={{ color: "red" }}
                  onClick={() => {
                    setSound("");
                    setSoundFile("");
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={8}>
          {/* Image upload component */}
          <InputLabel htmlFor="image-upload">Images</InputLabel>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              component="label"
              sx={{ textTransform: "none" }}
            >
              Select File
              <input
                hidden
                multiple
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setImageName(e.target.files[0].name);
                  setImages(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {images && (
            <>
              <img src={images} style={{ width: "100px" }} />
              <span style={{ marginLeft: 8 }}>{imageName}</span>
              <IconButton
                sx={{ color: "red" }}
                onClick={() => {
                  setImages("");
                  setImageFile("");
                }}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Grid>
        <Grid item container xs={12} alignItems="flex-end">
          <Grid item xs={8} />
          <Button variant="contained" onClick={editAnimal}>
            Edit Animal
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditAnimal;
