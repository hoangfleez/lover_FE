import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  TextField,
  Modal,
  Fade,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../services/firebase";
import { useUserProfile } from "../../customHook/useUserProfile";
import { editUser } from "../../services/useService";

export default function ProvidePage() {
  const dispatch = useDispatch();

  const profile = useUserProfile();

  const [formState, setFormState] = useState({
    avatar: "",
  });

  console.log(formState, 9999);
  const [imageUpload, setImageUpload] = useState(null);
  const [tempAvatar, setTempAvatar] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
    setTempAvatar(formState.avatar); // Lưu trữ ảnh tạm thời
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTempAvatar(""); // Xóa giá trị của tempAvatar
  };

  const handleSubmitEditProfile = async (event) => {
    alert("Cập nhật thành công");
    event.preventDefault();

    const editProfile = {
      id: profile.id,
      ...formState,
    };

    let res = await dispatch(editUser(editProfile));
  };

  const handleChangeImage = (event) => {
    event.preventDefault();
    if (event.target.files.length === 0) return;

    const image = event.target.files[0];
    const imageRef = ref(storage, `images/${image.name + v4()}`);

    uploadBytes(imageRef, image)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        setTempAvatar(url);
      })
      .catch((error) => {
        // Handle any error occurred during image upload
        console.log(error);
      });
  };

  const handleSaveImage = async () => {
    let res = await dispatch(editUser({ ...formState, avatar: tempAvatar }));
    if (res.error) {
    } else {
      setFormState({ ...formState, avatar: tempAvatar }); // Update the formState with the new avatar URL
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (profile) {
      setFormState(profile);
    }
  }, [profile]);

  return (
    <>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Thông tin cá nhân
        </Typography>

        <form>
          {profile && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "75%",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    className="hover-image"
                    component="img"
                    image={formState.avatar}
                    alt="Avatar"
                    style={{
                      objectFit: "container",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
                <Box onClick={handleOpenModal} sx={{ cursor: "pointer" }}>
                  <Typography color="red">Thay đổi</Typography>
                  <Typography>JPG, GIF OR PND</Typography>
                </Box>
              </Box>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
              >
                <Fade in={open}>
                  <div
                    className="modal-paper"
                    style={{
                      background: "white",
                      width: 350,
                      height: 450,
                      position: "absolute",
                      top: "30%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {tempAvatar && (
                      <img
                        src={tempAvatar}
                        alt="Preview"
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "contain",
                          margin: "10px 0 0 25px",
                        }}
                      /> // set width and height of image to 400px and 300px respectively
                    )}

                    <form>
                      <div className="mb3">
                        <input
                          style={{ marginLeft: 10 }}
                          id="exampleInput"
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChangeImage}
                        />
                      </div>
                    </form>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "5px",
                        width: "100%",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleSaveImage}
                        style={{ float: "right", marginLeft: "10px" }}
                      >
                        Lưu
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCloseModal}
                        style={{ float: "right" }}
                      >
                        Thoát
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>

              <Box sx={{ width: "70ch", marginTop: "50px" }}>
                <Box>
                  <Typography variant="overline" gutterBottom>
                    TÊN / BIỆT DANH
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    placeholder="Hãy nhập biệt danh"
                  />
                </Box>

                <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
                <Box>
                  <Typography variant="overline" gutterBottom>
                    Xác thực hồ sơ
                  </Typography>
                  <TextField fullWidth multiline placeholder="Số CMTND/CCCD" />
                </Box>
                <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          color: "customColorSchemes.textColor",
                          textTransform: "none",
                        }}
                      >
                        Cập nhật mặt trước CMND/CCCD
                      </Button>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        mt={2}
                      >
                        Tham khảo
                      </Typography>
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          objectFit="contained"
                          image="https://images2.thanhnien.vn/zoom/622_389/Uploaded/khanhtd/2022_06_08/8b63a9ff2202e25cbb13-1752.jpg"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          color: "customColorSchemes.textColor",
                          textTransform: "none",
                        }}
                      >
                        Cập nhật mặt sau CMND/CCCD
                      </Button>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        mt={2}
                      >
                        Tham khảo
                      </Typography>
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          objectFit="contained"
                          image="https://images2.thanhnien.vn/zoom/622_389/Uploaded/khanhtd/2022_06_08/8b63a9ff2202e25cbb13-1752.jpg"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box sx={{ width: "70ch", marginTop: 3 }}>
                <Button
                  onClick={handleSubmitEditProfile}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px",
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  Cập nhật
                </Button>
              </Box>
            </Box>
          )}
        </form>
      </Box>
    </>
  );
}
