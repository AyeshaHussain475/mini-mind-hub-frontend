import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { Grid } from "@mui/material";

const pages = [
  { label: "Quran", link: "/islamic" },
  { label: "Sounds", link: "/phonics" },
  { label: "Quiz", link: "/quizzes" },
  { label: "Canvas", link: "/canvas" },
  { label: "Games", link: "/games" },
  { label: "StoryImages", link: "/story" },
  { label: "ABC", link: "/deaf4" },
  { label: "Signs", link: "/deaf3" },
  { label: "Learn", link: "/deaf2" },
  { label: "Deaf", link: "/deaf" },
];

const settings = ["Profile", "Account", "Logout"];
const Header = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  useEffect(() => {
    if (user.role === "admin" && !settings.includes("Dashboard")) {
      settings.push("Dashboard");
    }
  }, [user.role]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAction = (action) => {
    if (action === "Logout") {
      localStorage.removeItem("user");
      navigate("/login");
    }
    if (action === "Profile") {
      navigate("/profile");
    }
    if (action === "Dashboard") {
      navigate("/dashboard");
    }
  };

  // useEffect(() => {
  //   if (user.role === "admin") {
  //     setSettings((prev) => [...prev, "Dashboard"]);
  //   }
  // }, []);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container>
          <Grid item>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MiniMind Hub
            </Typography>
          </Grid>
          {/* <Grid item>
            <img src={logo} width="50px" style={{ borderRadius: "20px" }} />
          </Grid> */}
        </Grid>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                // onClick={handleCloseNavMenu}
                onClick={() => navigate(page.link)}
              >
                <Typography textAlign="center">{page.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MiniMind Hub
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              // onClick={handleCloseNavMenu}
              onClick={() => navigate(page.link)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Typography sx={{ color: "white" }}>
                {user.firstName} {user.lastName}
              </Typography>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => handleAction(setting)}
                >
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
