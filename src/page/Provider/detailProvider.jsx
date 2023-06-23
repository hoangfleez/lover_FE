import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviderDetail } from "../../services/providerService";
import {
  Box,
  Button,
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

const DetailProvider = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showRent, setShowRent] = useState(false);
  const [dataProvider, setDataProvider] = useState({});
  const detailProviderDetail = useSelector((state) => {
    return state.provider.showOneProvider;
  });


  const handleClose = () => {
    setShowRent(false);
  };

  const handleRentProvider = (provider) => {
    setDataProvider(provider);
    setShowRent(true);
  };

  useEffect(() => {
    dispatch(getProviderDetail(id));
  }, []);
  return (
    <Box
      sx={{
        marginTop: "64px",
        padding: "10px",
        height: "100%",
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
              image={detailProviderDetail.avatar}
              alt="Avatar"
            />
            {detailProviderDetail.ready == "on" ? (
              <Typography variant="h5" gutterBottom sx={{ color: "green" }}>
                Đang sẵn sàng
              </Typography>
            ) : (
              <Typography variant="h5" gutterBottom sx={{ color: "gray" }}>
                Không sẵn sàng
              </Typography>
            )}

            <Link to={detailProviderDetail.linkFB}>
              <FacebookIcon sx={{ color: "blue", fontSize: "40px" }} />
            </Link>
            <Typography variant="button" display="block" gutterBottom>
              NGÀY THAM GIA:
              {moment(detailProviderDetail.joinDate).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box sx={{ width: "60%", padding: "0 10px" }}>
            <Typography variant="h3">{detailProviderDetail.name}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "120px",
              }}
            >
              <Typography variant="button" color={"gray"}>
                ĐÃ DƯỢC THUÊ
              </Typography>
              <Typography variant="button" color={"red"}>
                {detailProviderDetail.count}/người
              </Typography>
            </Box>
            <Divider />
            <Box>
              Dịch vụ chính
              <Stack direction="row" p={2}>
                <Chip label="Chip Filled" />
              </Stack>
            </Box>
            <Box>
              Dịch vụ mở rộng
              <Stack direction="row" spacing={1} p={2}>
                <Chip label="Chip Filled" />
                <Chip label="Chip Outlined" variant="outlined" />
              </Stack>
            </Box>
            <Divider />
            <Box p={1}>
              <Typography variant="h5">Thông tin</Typography>
              <Typography variant="body2">
                {detailProviderDetail.desc}
              </Typography>
              <Box
                sx={{ width: "100%", height: "150px", border: "1px solid red" }}
              >
                nơi chứa ảnh tự sướng
              </Box>
              <Typography variant="body2">
                {" "}
                Giới tính: {detailProviderDetail.sex}
              </Typography>
              <Typography variant="body2">
                {" "}
                Sinh nhật: {detailProviderDetail.dob}
              </Typography>
              <Typography variant="body2">
                {" "}
                Quốc tịch: {detailProviderDetail.country}
              </Typography>
              <Typography variant="body2">
                {" "}
                Sở thích: {detailProviderDetail.hobby}
              </Typography>
              <Typography variant="body2">
                {" "}
                Chiều cao: {detailProviderDetail.height}
              </Typography>
              <Typography variant="body2">
                {" "}
                Cân nặng: {detailProviderDetail.weight}
              </Typography>
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
                {detailProviderDetail.price} đ/1h
                <Rating readOnly />
              </Typography>
              <Box sx={{ flexWrap: "wrap", gap: "15px", display: "flex" }}>
                <Button
                  onClick={() => handleRentProvider(detailProviderDetail)}
                  fullWidth
                  variant="contained"
                  sx={{
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
    </Box>
  );
};

export default DetailProvider;
