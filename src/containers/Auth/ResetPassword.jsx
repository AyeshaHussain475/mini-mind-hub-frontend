import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import forgotIcon from "../../assets/forgotIcon.jpg";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        MiniMindHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setPassword] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/" />;
  }

  const handleUpdatePassword = async () => {
    setIsUpdating(true);
    const result = await axios.post("/update-password", {
      id,
      token,
      password,
    });

    if (result.status === 200) {
      toast.success("Your password has been updated. Log in to continue");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.error("Something went wrong!");
    }
    setIsUpdating(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container>
        <Grid
          item
          xs={8}
          sx={{
            backgroundImage: `url(${forgotIcon})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box sx={{ height: "100vh" }} />
        </Grid>
        <Grid item xs={4}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Password
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  autoFocus
                  InputLabelProps={{
                    style: { color: "purple" },
                  }}
                  disabled={isUpdating}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "darkorchid",
                      color: "white",
                    }}
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </Button>
                </Stack>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
