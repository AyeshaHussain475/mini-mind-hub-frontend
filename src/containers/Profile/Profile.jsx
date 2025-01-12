import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { AccountCircle as Account } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUser(user);
  }, []);

  const handleSave = async () => {
    if (!firstName || !lastName) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      const result = await axios.put("/edit", {
        firstName,
        lastName,
        email,
        password,
      });
      if (result.status === 200) {
        toast.success("User is updated successfully!");
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            firstName,
            lastName,
          })
        );
        return;
      }
      toast.error("Something went wrong!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        gap={2}
        height="100vh"
        direction="column"
        style={{
          background: "linear-gradient(135deg, #c4aec4, #a8d8ea)",
          paddingTop: "5%",
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#333",
          }}
        >
          {user?.firstName}'s Profile
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
                required
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="LastName"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
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
