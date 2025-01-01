import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../axios";

const VerifyAccountPage = () => {
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`/verify-account?token=${token}`);
        if (response.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(response.data.message || "Invalid or expired token.");
        }
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error.response?.data?.message || "Something went wrong."
        );
      }
    };

    if (token) {
      verifyAccount();
    } else {
      setStatus("error");
      setErrorMessage("Token is missing.");
    }
  }, [token]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "#fff",
        }}
      >
        {status === "loading" && (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Verifying your account...
            </Typography>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 80, color: "green", mb: 2 }}
            />
            <Typography variant="h4" gutterBottom>
              Account Verified!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your account has been successfully verified. You can now log in
              and start using our services.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </>
        )}
        {status === "error" && (
          <>
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "red", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Verification Failed
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {errorMessage}
            </Typography>
            {/* TODO: will look for it in future */}
            {/* <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/resend-verification")}
            >
              Resend Verification Email
            </Button> */}
          </>
        )}
      </Box>
    </Container>
  );
};

export default VerifyAccountPage;
