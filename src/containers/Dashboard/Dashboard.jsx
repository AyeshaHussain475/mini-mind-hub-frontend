import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import BrushIcon from "@mui/icons-material/Brush";
import QuizIcon from "@mui/icons-material/Quiz";
import GamesIcon from "@mui/icons-material/SportsEsports";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getUsers = async () => {
    try {
      const result = await axios.get("/users");
      setUsers(result.data.Users);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(`/users/${id}`);
      if (result.status === 200) {
        toast.success("User deleted successfully!");
        getUsers();
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const verifyUser = async (id) => {
    try {
      const result = await axios.patch(`/users/${id}`);
      if (result.status === 200) {
        toast.success("User verified successfully!");
        getUsers();
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const features = [
    { text: "Animal Sounds", icon: <PetsIcon /> },
    { text: "Drawing Canvas", icon: <BrushIcon /> },
    { text: "Quizzes", icon: <QuizIcon /> },
    { text: "Games", icon: <GamesIcon /> },
    { text: "Quranic Lessons", icon: <MenuBookIcon /> },
    { text: "Chat App", icon: <ChatIcon /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f3e5f5",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        PaperProps={{
          style: {
            backgroundColor: "#dab6fc",
            width: "240px",
          },
        }}
      >
        <Typography variant="h5" align="center" sx={{ padding: "1rem" }}>
          Mini Mind Hub
        </Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem
              button
              key={index}
              sx={{
                "&:hover": {
                  backgroundColor: "#8a2be2",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#8a2be2" }}>
                {feature.icon}
              </ListItemIcon>
              <ListItemText primary={feature.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#8a2be2" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleSidebar}
              sx={{ marginRight: "1rem" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Admin Dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Admin Dashboard
          </Typography>

          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>ID:</strong> {user._id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Role:</strong> {user.role}
                    </Typography>
                    <div style={{ marginTop: "1rem", display: "flex", gap: 2 }}>
                      {user.role === "admin" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate("/Profile")}
                          style={{ marginRight: "0.5rem" }}
                        >
                          Profile
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      )}
                      {!user.isVerified && (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => verifyUser(user._id)}
                        >
                          Verify
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
