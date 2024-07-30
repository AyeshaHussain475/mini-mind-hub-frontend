import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import Phonic from "./Phonic";
import Pagination from "@mui/material/Pagination";
import { itemsPerPage } from "../../utils/constants";
import useFormState from "./useFormState";
import { useNavigate } from "react-router-dom";

const Phonics = () => {
  const {
    page,
    limit,
    animalQuery,
    postMedia,
    disable,
    toggleForm,
    onAudioChange,
    handleLimitChange,
    setName,
    setPage,
    setSearchByName,
    searchByName,
    setImages,
  } = useFormState();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchByName(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box>
      <Typography style={{ color: "purple", fontSize: "25px" }}>
        Animal Phonics
      </Typography>

      <input onChange={handleSearch} value={searchByName} />
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
              onClick={() => navigate("/add-phonic")}
            >
              Add Animal
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
                  multiple
                  onChange={(e) => setImages(Array.from(e.target.files))}
                />
                <label>Sound</label>
                <input
                  type="file"
                  id="soundUrl"
                  accept="audio/*"
                  onChange={onAudioChange}
                />
                <Button onClick={postMedia}>Upload</Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {animalQuery.isLoading && "loading data..."}
        {animalQuery.data?.animals.map((animal) => {
          const imageUrl = `http://localhost:7000/mini/media/${animal.images[0].name}`;
          const audioUrl = `http://localhost:7000/mini/media/${animal.sound}`;
          return (
            <Grid item xs={4}>
              <Phonic
                title={animal.name}
                imageUrl={imageUrl}
                audioUrl={audioUrl}
              />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        page={page}
        count={animalQuery.data?.totalPages}
        onChange={(e, p) => setPage(p)}
      />
      <FormControl style={{ width: 100, marginTop: 20 }}>
        <InputLabel>Items per page</InputLabel>
        <Select
          value={limit}
          label="Total Animals"
          onChange={handleLimitChange}
          style={{ height: "30px" }}
        >
          {itemsPerPage.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Phonics;
