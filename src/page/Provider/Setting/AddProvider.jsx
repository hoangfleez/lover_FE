import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addProvider,
  showProviderByUser,
} from "../../../services/providerService";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Birthday from "./Birthday";
import NickName from "./NickName";
import Interest from "./Interest";
import OtherService from "./OtherSevicer";
import FreeService from "./FreeSevicer";
import Price from "./Price";
import BasicService from "./BasicService";
import Describe from "./Describe";
import Height from "./Height";
import Weight from "./Weight";
import CountryAndCityComponent from "./Country";
import { useEffect, useState } from "react";
import Gender from "./Gender";
import LinkFB from "./LinkFB";
import AvatarProvider from "./AvatarProvider";
import ImageUploader from "./Image";

const AddProvider = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.idUser;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const profile = useSelector((state) => {
    return state.provider.showOneProvider;
  });

  useEffect(() => {
    dispatch(showProviderByUser());
  }, []);

  const formik = useFormik({
    enableReinitialize: true, // Cho phép sử dụng lại giá trị ban đầu khi initialValues thay đổi
    initialValues: {
      name: profile ? profile.name : "", // Sử dụng dữ liệu từ profile nếu có
      dob: profile ? profile.dob : "",
      sex: profile ? profile.sex : "",
      city: profile ? profile.city : "",
      country: profile ? profile.country : "",
      avatarProvider: profile ? profile.avatarProvider : "",
      height: profile ? profile.height : "",
      weight: profile ? profile.weight : "",
      hobby: profile ? profile.hobby : "",
      desc: profile ? profile.desc : "",
      linkFB: profile ? profile.linkFB : "",
      price: profile ? profile.price : "",
      image: profile ? profile.images : [],
      service: profile ? profile.serviceProviders : [],
    },
    
    onSubmit: async (values) => {
      const { freeService, mainService, otherService, ...rest } = values;

      const serviceArray = [...freeService, mainService, ...otherService];
      const id = serviceArray.map((item) => item.id);
      const newProvider = {
        ...rest,
        // user: userId,
        service: id,
      };

      await dispatch(addProvider(newProvider));
    },
  });

  return (
    <Stack p={2}>
      <Typography variant="h4" gutterBottom>
        Cài đặt dịch vụ
      </Typography>
      <Box display={"flex"}>
        <form onSubmit={formik.handleSubmit}>
          <Stack width={"100%"} gap={3}>
            <AvatarProvider formik={formik} />
            <NickName formik={formik} name="name" />
            <Divider />
            <Stack
              direction={"row"}
              spacing={4}
              justifyContent={"space-between"}
            >
              <BasicService formik={formik}  />
              <Price formik={formik} name="price" />
            </Stack>
            <Divider />
            <Stack>
              <Stack direction={"column"} gap={2}>
                <Stack>
                  <OtherService formik={formik} />
                </Stack>
                <Stack>
                  <FreeService formik={formik} />
                </Stack>
              </Stack>
            </Stack>
            <Divider />
            <Birthday formik={formik} />
            <Divider />
            <CountryAndCityComponent
              formik={formik}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
            <Divider />
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Height formik={formik} name="height" />
              <Weight formik={formik} name="weight" />
            </Stack>
            <Divider />
            <Gender formik={formik} />
            <Divider />
            <LinkFB formik={formik} />
            <Divider />
            <ImageUploader formik={formik} image={formik.values.image} />
            <Divider />
            <Interest formik={formik} name="hobby" />
            <Divider />
            <Describe formik={formik} name="desc" />
            <Divider />
            <Button color="primary" variant="contained" fullWidth type="submit">
              {profile === undefined ? "Đăng bài" : "Cập nhật"}
            </Button>
          </Stack>
        </form>
        <Stack ml={10}>
          {profile ? (
            <Button
              variant="contained"
              sx={{ padding: "20px", backgroundColor: "red", color: "white" }}
            >
              Tắt dịch vụ
            </Button>
          ) : (
            ""
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default AddProvider;
