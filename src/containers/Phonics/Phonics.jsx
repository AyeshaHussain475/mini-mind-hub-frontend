import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
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
import Mammals from "../../assets/mammals.png";
import Birds from "../../assets/birds.png";
import Fish from "../../assets/fish.png";
import Reptiles from "../../assets/reptiles.png";
import All from "../../assets/all.png";
import InfoIcon from "@mui/icons-material/Info";

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
      value: "",
      img: All,
    },
    {
      label: "Mammals",
      value: "mammals",
      img: Mammals,
    },
    {
      label: "Reptiles",
      value: "reptiles",
      img: Reptiles,
    },
    {
      label: "Birds",
      value: "birds",
      img: Birds,
    },
    {
      label: "Fish",
      value: "fish",
      img: Fish,
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
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "15px" }}
      >
        <Grid item>
          <TextField
            size="small"
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
        </Grid>
        <Grid item>
          <FormControl component="fieldset" sx={{ m: 1, minWidth: 120 }}>
            {/* <FormLabel component="legend">Type</FormLabel> */}
            <ToggleButtonGroup
              color="primary"
              value={type}
              exclusive
              onChange={handleType}
              aria-label="animal type"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {animalTypes.map((animalType) => (
                <Tooltip key={animalType.value} title={animalType.label}>
                  <ToggleButton value={animalType.value}>
                    <img
                      src={animalType.img}
                      style={{ width: "20px", marginRight: "10px" }}
                      alt={animalType.label}
                    />
                    {animalType.label}
                  </ToggleButton>
                </Tooltip>
              ))}
            </ToggleButtonGroup>
          </FormControl>
        </Grid>
        {/* <div style={{ flexGrow: 1 }} /> */}
        <Grid item>
          <Button variant="contained" onClick={() => navigate("/add-phonic")}>
            Add Animal
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {animalQuery.isLoading && "loading data..."}
        {animalQuery.data?.animals.map((animal) => {
          const primaryImage = animal.images.find((image) => image.isPrimary);
          const imageUrl = `http://localhost:7000/mini/media/${primaryImage?.name}`;
          console.log(imageUrl);
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
