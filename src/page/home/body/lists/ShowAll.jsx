import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Chip, Stack } from "@mui/material";
import ShowRating from "../../Rating/ShowRating";
import { useDispatch, useSelector } from "react-redux";
import {
    getProvider,
    newlyJoinedProviders,
    searchSexFemaleProviders,
    searchSexMaleProviders,
    topProviders,
} from "../../../../services/providerService";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ReactPaginate from "react-paginate";
import { createSelector } from 'reselect';

export const getProviderList = (state) => state.provider.listProvider.docs;

export default function ShowAll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [totalProviders, setTotalProviders] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const selectProviderList = createSelector(
        getProviderList,
        (providerList) => providerList || []
    );

    const showProvider = useSelector(selectProviderList);

    const handleNewProvider = async () => {
        await dispatch(newlyJoinedProviders());
    };

    const handleTopProviders = async () => {
        await dispatch(topProviders());
    };

    const handleMale = async () => {
        await dispatch(searchSexMaleProviders());
    };

    const handleFemale = async () => {
        await dispatch(searchSexFemaleProviders());
    };

    const handlePageClick = (event) => {
        dispatch(getProvider(+event.selected + 1));
    };

    useEffect(() => {
        dispatch(getProvider());
    }, [dispatch]);

    return (
        <>
            <img
                style={{ width: "100%" }}
                src="https://files.playerduo.net/production/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__ff5aee00-79ee-11ed-a19f-23a3b10d190e__admin_banner.jpg"
            />
            <Box sx={{ margin: "3px 0 10px 10px" }}>
                <button
                    style={{
                        backgroundColor: "#000000FB",
                        border: "none",
                        color: "white",
                        padding: "10px 20px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginLeft: 3
                    }}
                    onClick={handleNewProvider}
                >
                    Người đăng kí CCDV mới nhất
                </button>
                <button
                    style={{
                        backgroundColor: "#000000FB",
                        border: "none",
                        color: "white",
                        padding: "10px 20px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginLeft: 10
                    }}
                    onClick={handleTopProviders}
                >
                    Người có lượt thuê nhiều nhất
                </button>
                <button
                    style={{
                        backgroundColor: "#000000FB",
                        border: "none",
                        color: "white",
                        padding: "10px 20px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginLeft: 10
                    }}
                    onClick={handleMale}
                >
                    CCDV nam
                </button>
                <button
                    style={{
                        backgroundColor: "#000000FB",
                        border: "none",
                        color: "white",
                        padding: "10px 20px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginLeft: 10
                    }}
                    onClick={handleFemale}
                >
                    CCDV nữ
                </button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >
                {showProvider.length > 0 &&
                    showProvider.map((item) => (
                        <Card
                            sx={{
                                width: 300,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                            key={item.id}
                        >
                            <CardActionArea onClick={() => navigate(`/provider/${item._id}`)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.profilePicture}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <ShowRating rating={item.avgRating} />
                                </CardContent>
                            </CardActionArea>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px",
                                    backgroundColor: "#e8e8e8",
                                }}
                            >
                                <Typography variant="subtitle2">Giá thuê</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.price} VND/giờ
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px",
                                    backgroundColor: "#e8e8e8",
                                }}
                            >
                                <Badge color="secondary" variant="dot">
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            {item.name}
                                        </Typography>
                                        {item.ready === "1" ? (
                                            <FiberManualRecordIcon
                                                fontSize="medium"
                                                sx={{ color: "green" }}
                                            />
                                        ) : (
                                            <FiberManualRecordIcon
                                                fontSize="medium"
                                                sx={{ color: "gray" }}
                                            />
                                        )}
                                    </Stack>
                                </Badge>
                            </Box>
                        </Card>
                    ))}
            </Box>
            {totalProviders > 10 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={totalPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </Box>
            )}
        </>
    );
}
