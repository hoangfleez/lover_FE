import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  addProvider,
  showProviderByUser,
} from "../../../services/providerService";
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
import Gender from "./Gender";
import LinkFB from "./LinkFB";
import AvatarProvider from "./AvatarProvider";
import ImageUploader from "./Image";
import axios from "axios";
import MyNumber from "./MyNumber";

const AddProvider = () => {
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isServiceOn, setIsServiceOn] = useState(false); // State lưu trạng thái bật/tắt dịch vụ

  const profile = useSelector((state) => state.provider.showOneProvider);
  


  useEffect(() => {
    dispatch(showProviderByUser());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name || "",
      dob: profile?.dob || "",
      sex: profile?.sex || "",
      city: profile?.city || "",
      country: profile?.country || "",
      avatarProvider: profile?.avatarProvider || "",
      height: profile?.height || "",
      weight: profile?.weight || "",
      hobby: profile?.hobby || "",
      desc: profile?.desc || "",
      linkFB: profile?.linkFB || "",
      price: profile?.price || "",
      image: profile?.images || [],
      service: profile?.serviceProviders || [],
    },
    onSubmit: async (values) => {
      const { freeService, mainService, otherService, ...rest } = values;
      const serviceArray = [...freeService, mainService, ...otherService];
      const id = serviceArray.map((item) => item.id);
      const newProvider = {
        ...rest,
        service: id,
      };
      await dispatch(addProvider(newProvider));
      setIsSnackbarOpen(true);
    },
  });
  console.log(formik,32723)

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  useEffect(() => {

  }, [profile]);

  return (
    <Stack p={2}>
      <Typography variant="h4" gutterBottom>
        Cài đặt dịch vụ
      </Typography>
      <Box display="flex">
        <form onSubmit={formik.handleSubmit}>
          <Stack width="100%" gap={3}>
            <AvatarProvider formik={formik} />
            <NickName formik={formik} name="name" />
            <Divider />
            <MyNumber/>
            <Divider />
            <Stack direction="row" spacing={4} justifyContent="space-between">
              <BasicService formik={formik} />
              <Price formik={formik} name="price" />
            </Stack>
            <Divider />
            <Stack>
              <Stack direction="column" gap={2}>
                <OtherService formik={formik} />
                <FreeService formik={formik} />
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
            <Stack direction="row" spacing={2} justifyContent="space-between">
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
              {profile ? "Cập nhật" : "Đăng bài"}
            </Button>
          </Stack>
        </form>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Đăng bài thành công!
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
};

export default AddProvider;





