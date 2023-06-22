import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProvider } from "../../services/providerService";
import {
  Box,
  Divider,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const AddProvider = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    sex: "",
    city: "",
    country: "",
    avatar: "",
    height: "",
    weight: "",
    hobby: "",
    desc: "",
    request: "",
    linkFB: "",
    price: "",
    image: "",
    service: "",
  });

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.idUser;

  const handleSubmitAddProvider = async (event) => {
    event.preventDefault();
    const newProvider = {
      ...formData,
      user: userId,
    };

    await dispatch(addProvider(newProvider));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {/* <div>
        <h1>Cài đặt dịch vụ</h1>
        <form>
          <div>
            <label>Tên: </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Ngày sinh nhật: </label>
            <input
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Giới tính: </label>
            <input
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Thành phố: </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Quốc tịch: </label>
            <input
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Chiều cao: </label>
            <input
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Cân nặng: </label>
            <input
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Sở thích: </label>
            <input
              name="hobby"
              value={formData.hobby}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Ảnh: </label>
            <input
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Yêu cầu: </label>
            <input
              name="request"
              value={formData.request}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>linkFB: </label>
            <input
              name="linkFB"
              value={formData.linkFB}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Mô tả bản thân: </label>
            <input
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Giá: </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Trạng thái: </label>
            <input
              name="ready"
              value={formData.ready}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>status: </label>
            <input
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" onClick={handleSubmitAddProvider}>
            Cập nhật
          </button>
        </form>
      </div> */}
      <Typography variant="h4" gutterBottom>
        Cai dat dich vu
      </Typography>
      <form>
        <Stack width={"45%"} gap={3}>
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              Nick name
            </Typography>
            <TextField fullWidth multiline />
          </Stack>
          <Divider />
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              Dich vu
            </Typography>
            <TextField fullWidth multiline />
          </Stack>
          <Divider />
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              Chi phi h thue
            </Typography>
            <TextField fullWidth multiline />
          </Stack>
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              Chi phi h thue
            </Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={7}
              placeholder="Hay viet gi do"
              style={{ resize: "none", padding: "5px", borderRadius: "5px"}}
            />
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default AddProvider;
