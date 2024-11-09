import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  Pagination,
  IconButton,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { Animal } from "./Animal";
import { itemsPerPage } from "../../../utils/constants";
import useFormState from "./useFormState";
import { useNavigate } from "react-router-dom";
import { Search as SeacrhIcon, Search } from "@mui/icons-material";
import img from "../../../assets/img.avif";
import Mammals from "../../../assets/mammals.png";
import Birds from "../../../assets/birds.png";
import Fish from "../../../assets/fish.png";
import Reptiles from "../../../assets/reptiles.png";
import All from "../../../assets/all.png";
import Loader from "../../../components/Loader";
import BackArrow from "../../../assets/arrow.webp";

const AnimalPhonics = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, "user details");

  const navigate = useNavigate();
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

  const handleSearch = (e) => {
    setSearchByName(e.target.value);
    setPage(1);
  };

  const handleIconClick = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const handleType = (event) => {
    setType(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "#CBC3E3",
            },
          }}
          onClick={() => navigate("/phonics")}
        >
          <img src={BackArrow} style={{ width: "80px", height: "80px" }} />
        </IconButton>
        <Typography
          style={{
            color: "purple",
            fontSize: "25px",
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          Animal Phonics
          <img src={img} style={{ width: "40px", height: "40px" }} />
        </Typography>
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
        {user.role === "admin" && (
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/phonics/animal/create")}
            >
              Add Animal
            </Button>
          </Grid>
        )}
      </Grid>
      {animalQuery.isLoading && <Loader />}
      <Grid container spacing={1} mb={2}>
        {!animalQuery.isLoading &&
          animalQuery.data?.animals.map((animal) => {
            const primaryImage = animal.images.find((image) => image.isPrimary);
            const imageUrl = `http://localhost:7000/mini/media/${primaryImage?.name}`;
            const audioUrl = `http://localhost:7000/mini/media/${animal.sound}`;
            return (
              <Grid item xs={3} key={animal._id}>
                <Animal
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
      {!animalQuery.isLoading && animalQuery.data?.animals.length !== 0 && (
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Pagination
              page={page}
              count={animalQuery.data?.totalPages}
              onChange={(e, p) => setPage(p)}
            />
          </Grid>
          <Grid item>
            <FormControl style={{ width: 100 }}>
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
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AnimalPhonics;

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
