import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import { label } from "framer-motion/client";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";

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
    console.log(result, "Result of animal");
    setName(result.data.animal.name);
    setImages(
      `http://localhost:7000/mini/media/${result.data.animal.images[0].name}`
    );
    setImageName(result.data.animal.images[0].name);
    setSoundName(result.data.animal.sound); //soundName
    setSound(`http://localhost:7000/mini/media/${result.data.animal.sound}`); //retriving that sound from this url
    setDescription(result.data.animal.description);
    setType(result.data.animal.type);
  };

  useEffect(() => {
    getAnimal();
  }, [id]);

  return (
    <Box component="form" style={{ marginLeft: "10%" }}>
      <h1>Edit Animal</h1>
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
              </>
            )}
          </Box>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <audio ref={audioRef} src={sound} />
          </Grid>
          <Grid item xs={4}>
            {isPlaying ? (
              <IconButton onClick={handleAudio}>
                <PlayArrowIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleAudio}>
                <PauseIcon />
              </IconButton>
            )}
          </Grid>
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
            </>
          )}
        </Grid>
        <Grid item container xs={12} alignItems="flex-end">
          <Grid item xs={8} />
          <Button variant="contained">Edit Animal</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditAnimal;
