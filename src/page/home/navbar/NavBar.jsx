import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeToggle from "../../../theme/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import UserIcons from "../../user/UserIcons";
import PersonIcon from "@mui/icons-material/Person";
import BasicModal from "../../user/Modal";
import { searchProviders } from "../../../services/providerService";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../../utils";
// import { io } from "socket.io-client";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  padding: " 0 10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1px solid gray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => setOpen(true);

  const goHome = () => {
    clearLocalStorage();
    navigate("/");
  };

  const user = useSelector((state) => state.user.currentUser);
  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSearch = async (searchName) => {
    if (searchName !== "") {
      await dispatch(searchProviders(searchName));
      setName("");
    }
  };

  // useEffect(() => {
  //   const socket = io("http://localhost:5000");
  //   console.log(socket)
  //   console.log(
  //     socket.on("fistEvent", (m) => {
  //       console.log(m);
  //     })
  //   );
  // }, []);

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "customColorSchemes.backgroundColor",
        }}
      >
        <Toolbar>
          <FavoriteIcon
            fontSize="large"
            sx={{ mr: 2, color: "red", cursor: "pointer" }}
            onClick={goHome}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                color: "#e1b6be",
                cursor: "pointer",
              },
            }}
            onClick={goHome}
          >
            Love&Love
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search sx={{ color: "customColorSchemes.textColor" }}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={name}
              onChange={handleInput}
            />
            <SearchIcon onClick={() => handleSearch(name)} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              borderRight: "1px solid gray",
              padding: "0 15px",
            }}
          >
            {!user ? (
              <IconButton onClick={handleOpen}>
                <PersonIcon />
              </IconButton>
            ) : (
              <UserIcons />
            )}
          </Box>
          <ModeToggle />
        </Toolbar>
      </AppBar>
      <BasicModal open={open} setOpen={setOpen} />
    </Box>
  );
}
