import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import cheetah from "../assets/Cheetah.webp";
import tiger from "../assets/Tiger.jpg";
import goat from "../assets/Goat.webp";
import leopard from "../assets/Leopard.webp";
import cat from "../assets/cat.jpg";
import axios from "../axios";
import { toast } from "react-toastify";

const Phonics = () => {
  const postMedia = async () => {
    const formData = new FormData();

    formData.append("imageUrl", imageUrl);
    formData.append("name", name);
    formData.append("soundUrl", soundUrl);

    try {
      const result = await axios.post("/animal/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Media is uploaded successfully");
      getMedia();
      console.log(result);
    } catch (error) {
      toast.error("Media is failed to upload");
      console.log(error);
    }
  };

  const getMedia = async () => {
    const res = await axios.get("/animal/media");
    console.log(res.data);
    setImages(res.data);
  };

  useEffect(() => {
    getMedia();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);
  const animalImages = [tiger, cheetah, leopard, goat, cat];

  const [disable, setDisable] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [soundUrl, setSoundUrl] = useState("");
  const [images, setImages] = useState([]);

  const toggleForm = () => {
    setDisable(!disable);
  };

  // const onImageChange = (e) => {
  //   console.log(e.target.files[0]);
  // };

  return (
    <Box>
      <Typography style={{ color: "purple", fontSize: "25px" }}>
        Animal Phonics
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Box component="form">
          <Grid container spacing={2}>
            <Button
              sx={{
                backgroundColor: "purple",
                "&:hover": { backgroundColor: "darkviolet" },
              }}
              variant="contained"
              onClick={toggleForm}
            >
              {disable ? "Closed" : "Upload Media"}
            </Button>
            {disable && (
              <Grid>
                <label>Specie Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Image</label>
                <input
                  id="imageUrl"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageUrl(e.target.files)}
                />

                <label>Sound</label>
                <input
                  type="text"
                  id="soundUrl"
                  onChange={(e) => setSoundUrl(e.target.value)}
                />

                <Button onClick={postMedia}>Upload</Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>

      <Stack direction="row" spacing={2}>
        {animalImages.map((img) => (
          <img src={img} style={{ height: "278px" }} data-aos="zoom-in" />
        ))}
      </Stack>
      {images.map((data) => {
        return <img key={data.id} src={data.imageUrl} alt="Image" />;
      })}
    </Box>
  );
};

export default Phonics;
