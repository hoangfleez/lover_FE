import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, showUser } from "../../../services/useService.js";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowAndEditInfo = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.idUser;

  const profile = useSelector((state) => {
    if (state.user.profile?.data?.length > 0) {
      return state.user.profile.data[0];
    }
    return null;
  });




    const handleSubmitEditProfile = async (event) => {
      alert("cap nhat thanh cong")
    event.preventDefault();

    const editProfile = {
      id: userId,
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      identityCard: identityCard,
      avatar: avatar,
    };

    let res = await dispatch(editUser(editProfile));
  };

  useEffect(() => {
    dispatch(showUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setPassword(profile.password);
      setFirstname(profile.firstname);
      setLastname(profile.lastname);
      setAddress(profile.address);
      setPhoneNumber(profile.phoneNumber);
      setEmail(profile.email);
      setIdentityCard(profile.identityCard);
      setAvatar(profile.avatar);
    }
  }, [profile]);

  return (
    <Box
      sx={{
        marginTop: "64px",
        padding:"10px",
        height: "93vh"
      }}
    >
    <Container maxWidth="lg" >
        <form>
        {profile && (
            <Box sx={{  display: "flex", width: "100%", height:"100%" }}>
                <Box sx={{ width: "30%" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 250 }}
                        image={avatar}
                        alt="Avatar"
                    />
                </Box>

                <Box sx={{ width: "70%"}}>
                    <h1>Thông tin tài khoản</h1>
                    <Box sx={{width:"45ch"}}>
                    <TextField
                        sx={{ marginTop:2}}
                        fullWidth
                        label="Địa chỉ email"
                        multiline
                        defaultValue={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <TextField
                        sx={{marginTop:3}}
                        fullWidth
                        label="Họ"
                        multiline
                        defaultValue={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                    />
                    <TextField
                        sx={{marginTop:3}}
                        fullWidth
                        label="Tên"
                        multiline
                        defaultValue={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                    />
                
                    <TextField
                        sx={{marginTop:3}}
                        fullWidth
                        label="Địa chỉ"
                        multiline
                        defaultValue={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </Box>
              <Box sx={{width:"45ch", marginTop:3, }}>
                <Stack direction="row" spacing={2} sx={{justifyContent:"space-evenly"}}>
                <Button  onClick={handleSubmitEditProfile} variant="contained">
                    Cập nhật
                </Button>
                <Button  variant="contained" onClick={()=>{navigate("/")}} >
                Trang chủ
                </Button>
                </Stack>
              </Box>
                </Box>
            </Box>
        )}
        </form>
    </Container>
    </Box>


);
};






export default ShowAndEditInfo;
