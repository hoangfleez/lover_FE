import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import InforButton from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../../services/useService";
import SearchInput from "./Search.jsx";
import { grey } from "@mui/material/colors";

export default function PersonalPage() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.idUser;

  const profile = useSelector((state) => {
    if (state.user.profile?.data?.length > 0) {
      return state.user.profile.data[0];
    }
    return null;
  });

  console.log(profile, 8888);

  useEffect(() => {
    dispatch(showUser(userId));
  }, [dispatch, userId]);

  return (
    <Box
      sx={{
        height: "100vh",
        marginTop: "65px",
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl" fixed sx={{ height: "100%" }}>
        {profile && (
          <Grid container p={2}>
            <Grid item xs={3} p={2} align="center">
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  padding="5px"
                  component="img"
                  height="340"
                  image={profile.avatar}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" align="center">
                    Lizard
                  </Typography>
                  <Typography gutterBottom variant="h6" align="center">
                    (biet danh)
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    Nam sinh:
                    <br />
                    Song tai
                  </Typography>
                </CardContent>
              </Card>

              <InforButton />
            </Grid>
            <Grid item xs={6} p={2}>
              <Box
                bgcolor="customColorSchemes.backgroundColor"
                sx={{ width: "100%", borderRadius: "5px", padding: "10px" }}
              >
                <Avatar src={profile.avatar} />
              </Box>
            </Grid>
            <Grid item xs={3} p={2}>
              <SearchInput />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
