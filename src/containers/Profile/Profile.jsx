import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { AccountCircle as Account } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSave = async () => {
    try {
      const result = await axios.put("/edit", {
        firstName,
        lastName,
        email,
        password,
      });
      if (result.status === 200) {
        toast.success("User is updated successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={2}
        height="100vh"
        direction="column"
        style={{ background: "linear-gradient(135deg, #c4aec4, #a8d8ea)" }}
      >
        <Typography
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#333",
          }}
        >
          {firstName}'s Profile
        </Typography>
        <Paper
          elevation={5}
          style={{
            padding: "40px",
            borderRadius: "20px",
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Grid container justifyContent="center" mb={2} color="purple">
            <Box
              style={{
                backgroundColor: "#c4aec4",
                borderRadius: "50%",
                padding: "10px",
                width: "80px",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Account style={{ fontSize: 60 }} />
            </Box>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="FirstName"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="LastName"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                disabled
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              style={{
                marginTop: "30px",
                padding: "10px",
                backgroundColor: "#6200ea",
                color: "white",
                borderRadius: "30px",
              }}
              fullWidth
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default Profile;
