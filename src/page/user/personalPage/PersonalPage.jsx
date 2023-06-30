import { styled } from "@mui/system";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    InputBase,
    Typography,
} from "@mui/material";
import InforButton from "./Button";
import SearchInput from "./Search.jsx";
import { useUserProfile } from "../../../customHook/useUserProfile";

const HoverAvatar = styled(Avatar)`
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
    opacity: 0.6;
  }

  &:hover::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px; /* Adjust the width of the larger image as desired */
    height: 200px; /* Adjust the height of the larger image as desired */
    background-image: url("https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-camera-icon-png-image_1871609.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 1;
    z-index: 2;
  }
`;


export default function PersonalPage() {
    const profile = useUserProfile();

    return (
        <Box
            sx={{
                display: "block",
                height: "100vh",
                marginTop: "65px",
                flexGrow: 1,
                backgroundColor: "customColorSchemes.bgColorPage",
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
                                    alt="Avatar"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" align="center">
                                        Lizard
                                    </Typography>
                                    <>
                                    <Typography gutterBottom variant="h6" align="center">
                                        (biet danh)
                                    </Typography>
                                    </>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        align="center"
                                    >
                                        Nam sinh:
                                        <br />
                                        Song tai: {profile?.address}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <InforButton />
                        </Grid>
                        <Grid item xs={6} p={2}>
                            <Box
                                bgcolor="customColorSchemes.backgroundColor"
                                sx={{
                                    width: "100%",
                                    borderRadius: "5px",
                                    padding: "15px",
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                <HoverAvatar src={profile.avatar} />
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Hãy viết gì vào đây"
                                />
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