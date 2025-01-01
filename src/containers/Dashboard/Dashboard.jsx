import React, { useEffect, useRef, useState } from "react";
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
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
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
import { defaultLimit, itemsPerPage } from "../../utils/constants";
import { useDebounce } from "../../hooks/useDebounce";
import { useApiData } from "../../hooks/useApiData";
import Loader from "../../components/Loader";
import { Search as SeacrhIcon, Search } from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();
  const textFieldRef = useRef(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const [searchByName, setSearchByName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const debounceValue = useDebounce(searchByName);

  const usersQuery = useApiData(
    `/users?page=${page}&limit=${limit}&search=${debounceValue}`,
    "Failed to fetch users"
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(`/users/${id}`);
      if (result.status === 200) {
        toast.success("User deleted successfully!");
        usersQuery.refetch();
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
        usersQuery.refetch();
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearchByName(e.target.value);
    setPage(1);
  };

  const handleIconClick = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

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
          </Grid>
          {usersQuery.isLoading && <Loader />}
          <Grid container spacing={3}>
            {!usersQuery.isLoading &&
              usersQuery.data?.users.map((user) => (
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
                      <div
                        style={{ marginTop: "1rem", display: "flex", gap: 2 }}
                      >
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
          {!usersQuery.isLoading && usersQuery.data?.users.length !== 0 && (
            <Grid container justifyContent="flex-end" mt={2}>
              <Grid item>
                <Pagination
                  page={page}
                  count={usersQuery.data?.totalPages}
                  onChange={(e, p) => setPage(p)}
                />
              </Grid>
              <Grid item>
                <FormControl style={{ width: 120 }}>
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
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;

const features = [
  { text: "Animal Sounds", icon: <PetsIcon /> },
  { text: "Drawing Canvas", icon: <BrushIcon /> },
  { text: "Quizzes", icon: <QuizIcon /> },
  { text: "Games", icon: <GamesIcon /> },
  { text: "Quranic Lessons", icon: <MenuBookIcon /> },
  { text: "Chat App", icon: <ChatIcon /> },
];
