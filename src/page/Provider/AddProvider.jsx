import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProvider } from "../../services/providerService";


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
    ready: "",
    user: "",
    status: "",
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

    let res = await dispatch(addProvider(newProvider));
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
      <div>
        <h1>Thêm mới thông tin Provider</h1>
        <p>Thêm mới các thông tin của bạn ở đây</p>
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
      </div>
    </>
  );
};

export default AddProvider;
