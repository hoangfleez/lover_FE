import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  addProvider,
  editProvider,
  showProviderByUser,
} from "../../../services/providerService";
import Birthday from "./Birthday";
import NickName from "./NickName";
import Interest from "./Interest";
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
import MyNumber from "./MyNumber";
import OtherService from "./OtherService.jsx";

const AddProvider = () => {
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);


  const profile = useSelector((state) => state.provider.profile) || {};

  useEffect(() => {
    dispatch(showProviderByUser());
    dispatch(showProviderByUser());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile && profile.name ? profile.name : "",
      dob: profile && profile.dob ? profile.dob : "",
      sex: profile && profile.sex ? profile.sex : "",
      city: profile && profile.city ? profile.city : "",
      country: profile && profile.country ? profile.country : "",
      avatarProvider: profile && profile.avatarProvider ? profile.avatarProvider : "",
      height: profile && profile.height ? profile.height : "",
      weight: profile && profile.weight ? profile.weight : "",
      hobby: profile && profile.hobby ? profile.hobby : "",
      desc: profile && profile.desc ? profile.desc : "",
      linkFB: profile && profile.linkFB ? profile.linkFB : "",
      price: profile && profile.price ? profile.price : "",
      image: profile && profile.images ? profile.images : [],
      service: profile && profile.serviceProviders ? profile.serviceProviders.map(item => item.id) : [],
      otherService: profile && profile.otherService ? profile.otherService : [],
      mainService: profile && profile.mainService ? profile.mainService : [],
    },
    onSubmit: async (values) => {
      const { otherService, mainService, ...rest } = values;
      const serviceArray = [...otherService, mainService];
      const id = serviceArray.map((item) => item.id);
      const newProvider = {
        ...rest,
        service: id,
        id: profile?.id,
      };

      if (Object.keys(profile).length === 0) {
        // Add provider
        await dispatch(addProvider(newProvider));
      } else {
        // Edit provider
        await dispatch(editProvider({ id: profile.id, data: newProvider }));
      }

      setIsSnackbarOpen(true);
    },
  });

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

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
              <MyNumber />
              <Divider />
              <Stack direction="row" spacing={4} justifyContent="space-between">
                <BasicService formik={formik} />
                <Price formik={formik} name="price" />
              </Stack>
              <Divider />
              <Stack>
                <Stack direction="column" gap={2}>
                  <OtherService formik={formik} />
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
                {Object.keys(profile).length === 0 ? "Đăng bài" : "Cập nhật"}
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
            {Object.keys(profile).length === 0 ? "Đăng bài" : "Cập nhật"} thành công!
          </MuiAlert>
        </Snackbar>
      </Stack>
  );
};

export default AddProvider;
