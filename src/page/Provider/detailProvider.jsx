import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviderDetail } from "../../services/providerService";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import moment from "moment";
import Rent from "../booking/Rent.jsx";
import Evaluate from "./Evaluate";
import BasicModal from "../user/Modal";
import { useUserProfile } from "../../customHook/useUserProfile";

const DetailProvider = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showRent, setShowRent] = useState(false);
  const [dataProvider, setDataProvider] = useState({});
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const user = useUserProfile();

  const detailProviderDetail = useSelector((state) => {
    return state.provider.showOneProvider;
  });

  const profile = useSelector((state) => {
    return state.provider.profile;
  });
  const abc = useSelector((state) => {console.log(state)});
  console.log(user,11)
  console.log(detailProviderDetail,22)
  console.log(profile,33)


  const [ready, setReady] = useState(detailProviderDetail?.ready);

  const handleClose = () => {
    setShowRent(false);
  };

  const handleRentProvider = (provider) => {
    if (user) {
      setDataProvider(provider);
      setShowRent(true);
    } else {
      setOpen(true);
      // window.location.reload(true);
    }
  };

  useEffect(() => {
    dispatch(getProviderDetail(id));
  }, [dispatch]);

  useEffect(() => {
    setReady(detailProviderDetail?.ready);
  }, [detailProviderDetail?.ready]);

  useEffect(() => {
    if(detailProviderDetail?.id === profile?.id){
      setDisabled(true);
    }else {
      setDisabled(false);
    }
  },[user, detailProviderDetail?.id, profile?.id])

  return (
    <Box
      sx={{
        marginTop: "64px",
        padding: "10px",
        height: "100vh",
        backgroundColor: "customColorSchemes.bgColorPage",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "20px 0",
          }}
        >
          <Box
            sx={{
              width: "25%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              margin: "10px",
              gap: "10px",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 250, height: 250, borderRadius: 5 }}
              image={detailProviderDetail?.avatarProvider}
              alt="Avatar"
            />
            {ready == "1" ? (
              <Typography variant="h5" gutterBottom sx={{ color: "green" }}>
                Đang sẵn sàng
              </Typography>
            ) : (
              <Typography variant="h5" gutterBottom sx={{ color: "gray" }}>
                Không sẵn sàng
              </Typography>
            )}
            <Link to={detailProviderDetail?.linkFB}>
              <FacebookIcon sx={{ color: "blue", fontSize: "40px" }} />
            </Link>
            <Typography variant="body2" display="block" gutterBottom>
              NGÀY THAM GIA:
              {moment(detailProviderDetail?.joinDate).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body2">
              {" "}
              Quốc tịch: {detailProviderDetail?.country}
            </Typography>
            <Typography variant="body2">
              {" "}
              Nơi ở: {detailProviderDetail?.city}
            </Typography>
          </Box>
          <Box sx={{ width: "60%", padding: "0 10px" }}>
            <Typography variant="h3" gutterBottom>
              {detailProviderDetail?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "120px",
              }}
            >
              <Typography variant="body2" color={"gray"}>
                ĐÃ DƯỢC THUÊ
              </Typography>
              <Typography variant="body2" color={"red"}>
                {detailProviderDetail?.count}/người
              </Typography>
            </Box>
            <Divider />
            <Box>
              Dịch vụ chính
              <Stack direction="row" p={2}>
                {detailProviderDetail?.serviceProviders?.map(
                  (service, serviceKey) => {
                    return service.service.type.id === 1 ? (
                      <Chip
                        key={serviceKey}
                        label={service.service.name}
                        color="primary"
                      />
                    ) : null;
                  }
                )}
              </Stack>
            </Box>
            <Box>
              Dịch vụ mở rộng
              <Stack direction="row" spacing={1} p={2}>
                {detailProviderDetail?.serviceProviders?.map(
                  (service, serviceKey) => {
                    if (service.service.type.id === 2) {
                      return (
                        <Chip key={serviceKey} label={service?.service.name} />
                      );
                    } else if (service?.service.type.id === 3) {
                      return (
                        <Chip
                          key={serviceKey}
                          label={service?.service.name}
                          variant="outlined"
                        />
                      );
                    } else {
                      return null;
                    }
                  }
                )}
              </Stack>
            </Box>
            <Divider />
            <Box p={1}>
              <Stack gap={1}>
                <Typography variant="h5">Thông tin</Typography>
                <Typography variant="body2">
                  - Mô tả: {detailProviderDetail?.desc}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "150px",
                    display: "flex",
                  }}
                >
                  {detailProviderDetail?.images?.map((image, index) => (
                    <Card
                      key={index}
                      sx={{
                        width: 150,
                        height: 150,
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        src={image.imageURL}
                        sx={{ height: 150 }}
                      />
                    </Card>
                  ))}
                </Box>
                <Typography variant="body2">
                  {" "}
                  - Giới tính: {detailProviderDetail?.sex}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  - Sinh nhật: {detailProviderDetail?.dob}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  - Sở thích: {detailProviderDetail?.hobby}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  - Chiều cao: {detailProviderDetail?.height}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  - Cân nặng: {detailProviderDetail?.weight}
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Evaluate />
          </Box>
          <Box sx={{ width: "20%" }}>
            <Box
              sx={{
                width: 280,
                border: "1px solid grey",
                borderRadius: "15px",
                padding: "10px",
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ color: "red" }}>
                {detailProviderDetail?.price} đ/1h
                <Rating readOnly />
              </Typography>
              <Box sx={{ flexWrap: "wrap", gap: "15px", display: "flex" }}>
                <Button
                  onClick={() => handleRentProvider(detailProviderDetail)}
                  fullWidth
                  variant="contained"
                  disabled={disabled}
                  sx={{
                    display: ready === "1" ? "box" : "none",
                    p: 1.5,
                    bgcolor: "red",
                    color: "white",
                    "&:hover": {
                      bgcolor: "red",
                      color: "white",
                      boxShadow: "none",
                    },
                  }}
                >
                  THUÊ
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    p: 1.5,
                    bgcolor: "white",
                    color: "black",
                    "&:hover": {
                      bgcolor: "white",
                      boxShadow: "none",
                      color: "black",
                    },
                  }}
                >
                  DONET
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    p: 1.5,
                    bgcolor: "white",
                    color: "black",
                    "&:hover": {
                      bgcolor: "white",
                      boxShadow: "none",
                      color: "black",
                    },
                  }}
                >
                  <ChatBubbleIcon />
                  Chat
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Rent
        show={showRent}
        handleClose={handleClose}
        dataProvider={dataProvider}
      />
      <BasicModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default DetailProvider;
