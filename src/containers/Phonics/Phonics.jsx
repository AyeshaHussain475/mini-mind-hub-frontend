import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import Phonic from "./Phonic";
import Pagination from "@mui/material/Pagination";
import { itemsPerPage } from "../../utils/constants";
import useFormState from "./useFormState";
import { useNavigate } from "react-router-dom";
import { Search as SeacrhIcon, Search } from "@mui/icons-material";
import img from "../../assets/img.avif";

const Phonics = () => {
  const textFieldRef = useRef(null);
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
    type,
    setType,
  } = useFormState();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchByName(e.target.value);
    setPage(1);
  };

  const handleIconClick = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const animalTypes = [
    {
      label: "All",
      value: " ",
    },
    {
      label: "Mammals",
      value: "mammals",
    },
    {
      label: "Reptiles",
      value: "reptiles",
    },
    {
      label: "Birds",
      value: "birds",
    },
    {
      label: "Fish",
      value: "fish",
    },
  ];

  const handleType = (event) => {
    setType(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          style={{ color: "purple", fontSize: "25px" }}
          align="center"
        >
          Animal Phonics
        </Typography>
        <img src={img} style={{ width: "60px", height: "60px" }} />
      </Box>
      <Stack direction="row" style={{ marginBottom: "15px" }}>
        <TextField
          label="Search by name"
          value={searchByName}
          onChange={handleSearch}
          inputRef={textFieldRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search
                  style={{ color: "purple", cursor: "pointer" }}
                  onClick={handleIconClick}
                />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={type}
            label="type"
            onChange={handleType}
          >
            {animalTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {" "}
                {type.label}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ flexGrow: 1 }} />
        <Button
          // size="small"
          variant="contained"
          onClick={() => navigate("/add-phonic")}
        >
          Add Animal
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {animalQuery.isLoading && "loading data..."}
        {animalQuery.data?.animals.map((animal) => {
          const primaryImage = animal.images.find((image) => image.isPrimary);
          const imageUrl = `http://localhost:7000/mini/media/${primaryImage?.name}`;
          const audioUrl = `http://localhost:7000/mini/media/${animal.sound}`;
          return (
            <Grid item xs={4}>
              <Phonic
                title={animal.name}
                imageUrl={imageUrl}
                audioUrl={audioUrl}
                description={animal.description}
                id={animal._id}
                refetch={animalQuery.refetch}
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
