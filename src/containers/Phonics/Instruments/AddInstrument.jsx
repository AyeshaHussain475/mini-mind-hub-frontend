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
import { useState } from "react";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../../assets/arrow.webp";
import {
  Audiotrack as AudiotrackIcon,
  Image as ImageIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const AddInstrument = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [sound, setSound] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !image || !sound) {
      toast.warning("Fill the missing enteries");
      return;
    }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    formData.append("sound", sound);

    try {
      const result = await axios.post("/instrument/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.status === 201) {
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
        Add Instrument
      </Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            required
            name="name"
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
              onChange={(e) => setSound(e.target.files[0])}
            />
          </Button>
          {sound && (
            <Grid>
              <span style={{ marginLeft: "8px" }}>{sound.name}</span>
              <IconButton onClick={() => setSound("")}>
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
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          {image && (
            <Grid container mt={3}>
              <img src={URL.createObjectURL(image)} width={50} height={50} />
              <span style={{ marginLeft: "8px" }}> {image.name}</span>
              <IconButton onClick={() => setImage("")}>
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
            Create Instrument
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddInstrument;
