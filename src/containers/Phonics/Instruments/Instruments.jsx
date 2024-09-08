import { useState } from "react";
import { useApiData } from "../../../hooks/useApiData";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Instrument from "./Instrument";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../../assets/arrow.webp";

const Instruments = () => {
  const [instruments, setInstruments] = useState([]);
  const instrumentsQuery = useApiData("/instrument/media");
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#9d9db8" }}>
        <Typography
          style={{
            textAlign: "center",
            fontFamily: "'Fredoka One', cursive",
            fontSize: "2.5rem",
            color: "#FFFFFF",
            textShadow: "2px 2px 4px purple",
            // margin: "20px 0",
            animation: "bounce 1s infinite",
          }}
        >
          Come and play with Your own mini Instruments!
        </Typography>
      </div>
      {/* <Loader /> */}
      {/* Search textfield and Add Button plus Arrow*/}

      <Grid container justifyContent="space-around" mt={2}>
        <Grid item>
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
        </Grid>
        <Grid item>
          <TextField></TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ borderRadius: "20px", marginRight: "8px" }}
            onClick={() => navigate("/phonics/instrument/create")}
          >
            Add Instrument
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={5} sx={{ marginTop: "10px" }}>
        {instrumentsQuery.data?.instruments.map((instrument) => {
          const image = `http://localhost:7000/mini/media/${instrument.image}`;
          const sound = `http://localhost:7000/mini/media/${instrument.sound}`;
          return (
            <Grid item key={instrument._id}>
              <Instrument
                name={instrument.name}
                image={image}
                sound={sound}
                id={instrument._id}
                refetch={instrumentsQuery.refetch}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Instruments;
