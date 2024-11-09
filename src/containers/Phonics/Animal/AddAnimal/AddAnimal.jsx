import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "../../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../../../assets/arrow.webp";

const animalTypes = [
  { label: "Mammals", value: "mammals" },
  { label: "Reptiles", value: "reptiles" },
  { label: "Birds", value: "birds" },
  { label: "Fish", value: "fish" },
];

const AnimalForm = () => {
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState({
    name: "",
    description: "",
    type: "",
    images: [],
    sound: "",
  });

  const handleChange = (event) => {
    setAnimalData({ ...animalData, [event.target.name]: event.target.value });
  };

  const handleRemoveImage = (image) => {
    setAnimalData({
      ...animalData,
      images: animalData.images.filter((img) => img.name !== image.name),
    });
  };

  const handleCreateAnimal = async () => {
    const formData = new FormData();

    animalData.images.reverse().forEach((image) => {
      formData.append("images", image);
    });
    formData.append("name", animalData.name);
    formData.append("sound", animalData.sound);
    formData.append("description", animalData.description);
    formData.append("type", animalData.type);

    try {
      const result = await axios.post("/animal/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.status === 201) {
        toast.success("Animal created successfully");
        navigate("/phonics");
      } else {
        toast.error("Failed to upload media. Try again!");
      }
    } catch (error) {
      toast.error("Media is failed to upload");
      console.log(error);
    }
  };

  return (
    <Box component="form" style={{ marginLeft: "10%" }}>
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
        }}
      >
        Add Animal
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            required
            fullWidth
            name="name"
            label="Animal Name"
            value={animalData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            multiline
            rows={3}
            name="description"
            label="Description"
            value={animalData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              label="Type"
              labelId="type-label"
              value={animalData.type}
              onChange={(e) =>
                setAnimalData({
                  ...animalData,
                  type: e.target.value.toLowerCase(),
                })
              }
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
                onChange={(e) =>
                  setAnimalData({ ...animalData, sound: e.target.files[0] })
                }
              />
            </Button>
            {animalData.sound && (
              <>
                <span style={{ marginLeft: 8 }}>{animalData.sound.name}</span>
                <div
                  onClick={() => setAnimalData({ ...animalData, sound: "" })}
                >
                  <CloseIcon style={{ cursor: "pointer", color: "red" }} />
                </div>
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
              Select Files
              <input
                hidden
                multiple
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={(e) =>
                  setAnimalData({
                    ...animalData,
                    images: Array.from(e.target.files),
                  })
                }
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="row" flexWrap="wrap">
            {animalData.images.length > 0 &&
              animalData.images.map((image) => (
                <Grid item container direction="column" xs={3}>
                  <Grid item>
                    <img
                      heigth={50}
                      width={50}
                      src={URL.createObjectURL(image)}
                    />
                    <CloseIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleRemoveImage(image)}
                    />
                  </Grid>
                  <Grid item>{image.name}</Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item container xs={12} alignItems="flex-end">
          <Grid item xs={8} />
          <Button variant="contained" onClick={handleCreateAnimal}>
            Create Animal
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimalForm;
