import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Chip, Stack } from "@mui/material";
import ShowRating from "../../Rating/ShowRating";
import { useDispatch, useSelector } from "react-redux";
import {getProvider, newlyJoinedProviders} from "../../../../services/providerService";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function ShowAll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalProviders, setTotalProviders] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const showProvider = useSelector((state) => {
    return state.provider.listProvider;
  });

  const handleNewProvider = async () => {
      await dispatch(newlyJoinedProviders())
  }

  useEffect(() => {
    dispatch(getProvider());
  }, []);

  return (
    <>
        <button onClick={handleNewProvider}>Người đăng kí CCDV mới nhất</button>
      <img
        style={{ width: "93%" }}
        src="https://files.playerduo.net/production/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__ff5aee00-79ee-11ed-a19f-23a3b10d190e__admin_banner.jpg"
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
          showProvider.map((item, key) => {


            return (
              <Card
                sx={{ width: 250 }}
                key={key}
                onClick={() => navigate(`/detail-provider/${item.id}`)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.avatarProvider}
                    alt="green iguana"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      position: "relative",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      {item.price}/1h
                    </Button>
                  </Box>
                  <CardContent>
                  <Badge color="secondary" badgeContent=" " variant="dot">
                  <Stack direction={"row"}  justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    {item.ready === "1" ? (<FiberManualRecordIcon fontSize="s" sx={{color:"green"}}/>) : (<FiberManualRecordIcon fontSize="s" sx={{color:"gray"}}/>)}
                    
                  </Stack>
                    </Badge>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      color={"gray"}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardContent>
                  <ShowRating />

{/* 
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    flexWrap={"wrap"}
                  >
                    {item.serviceProviders.map((service, serviceKey) => {
                      if (service.service.type.id === 1) {
                        return (
                          <Chip
                            key={serviceKey}
                            color="primary"
                            label={service.service.name}
                          />
                        );
                      } else {
                        return (
                          <Chip
                            key={serviceKey}
                            label={service.service.name}
                            size="small"
                          />
                        );
                      }
                    })}
                  </Stack> */}
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </>
  );
}
