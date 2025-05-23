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
import { Navigate, useNavigate } from "react-router-dom";
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

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const user = localStorage.getItem("user");
  const [isSendingEmail, setSendingEmail] = React.useState(false);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleForgotPassword = async () => {
    setSendingEmail(true);
    const result = await axios.post("/reset-password", {
      email,
    });

    if (result.status === 200) {
      toast.success(
        "Reset Password email has been sent successfully! Check Your Mail"
      );
      setEmail("");
    } else {
      toast.error("Something went wrong!");
    }
    setSendingEmail(false);
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
                Forgot Password
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputLabelProps={{
                    style: { color: "purple" },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handleForgotPassword}
                    disabled={isSendingEmail}
                  >
                    Ok
                  </Button>
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
                  >
                    Cancel
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
