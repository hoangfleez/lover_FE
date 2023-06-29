import { styled } from "@mui/system";
import {
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

const HoverCardMedia = styled(CardMedia)`
  transition: transform 0.3s;
  position: relative;

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
    background-image: url("https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-camera-icon-png-image_1871609.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.8;
    z-index: -1;
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
                                <HoverCardMedia
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
                                        Song tai: {profile?.address}
                                    </Typography>
                                </CardContent>

                                <InforButton />
                            </Card>
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
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={profile.avatar}
                                        alt="avatar"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            opacity: 0,
                                            transition: "opacity 0.3s",
                                            "&:hover": {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ color: "#fff" }}
                                        >
                                            Hover Text
                                        </Typography>
                                    </Box>
                                </Box>

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
