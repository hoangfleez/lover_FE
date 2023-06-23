import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Stack } from "@mui/material";
import ShowRating from "../../Rating/ShowRating";
import { useDispatch, useSelector } from "react-redux";
import { getProvider } from "../../../../services/providerService";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

// Move the styles to a separate CSS file or a CSS-in-JS solution like Emotion or Styled Components

export default function ShowAll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalProviders, setTotalProviders] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const showProvider = useSelector((state) => {
        return state.provider.listProvider;
    });


    useEffect(() => {
        dispatch(getProvider());
    }, []);



    return (
        <>
            <img
                style={{ width: "93%" }}
                src={
                    "https://files.playerduo.net/production/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__ff5aee00-79ee-11ed-a19f-23a3b10d190e__admin_banner.jpg"
                }
            />
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    gap: 1,
                }}
            >
                {showProvider &&
                    showProvider.map((item, key) => (
                        <Card sx={{ width: 250 }} key={key} onClick={() => navigate(`/detail-provider/${item.id}`)}>
                            <CardActionArea>
                                <CardMedia component="img" height="250" image={item.user.avatar} alt="green iguana" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardContent>
                                <ShowRating />
                                <Typography variant="body2" color="text.secondary">
                                    <Stack direction="column" justifyContent="center" alignItems="baseline" spacing={2} mt={2}>
                                        {/*<Chip color="primary" />*/}
                                        <Stack direction="row" gap="5px" flexWrap="wrap">
                                            {/*{item.other.map((otherItem, otherIndex) => (*/}
                                            {/*  <Chip label={otherItem} size="small" key={otherIndex} />*/}
                                            {/*))}*/}
                                            {item.desc}
                                        </Stack>
                                    </Stack>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </Box>

        </>
    );
}