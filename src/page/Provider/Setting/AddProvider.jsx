import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addProvider } from "../../../services/providerService";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
import { useState } from "react";
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

  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      sex: "",
      city: "",
      country: "",
      avatarProvider: "",
      height: "",
      weight: "",
      hobby: "",
      desc: "",
      request: "",
      linkFB: "",
      price: "",
      image: [],
      service: [],
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(JSON.stringify(values, null, 2));
      const { selectedServices, ...rest } = values;

      const newProvider = {
        ...rest,
        selectedServices,
        user: userId,
      };

      await dispatch(addProvider(newProvider));
    },
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Cài đặt dịch vụ
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack width={"45%"} gap={3}>
          <AvatarProvider formik={formik} />
          <NickName formik={formik} name="name" />
          <Divider />
          <Stack direction={"row"} spacing={4} justifyContent={"space-between"}>
            <BasicService formik={formik}  />
            <Price formik={formik} name="price" />
          </Stack>
          <Divider />
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              Dịch vụ khác
            </Typography>
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
          <Birthday formik={formik} name="dob" />
          <Divider />
          <CountryAndCityComponent
            formik={formik}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
          <Divider />
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <Height formik={formik} name="height" />
            <Weight formik={formik} name="weight" />
          </Stack>
          <Divider />
          <Gender formik={formik} />
          <Divider />
          <LinkFB formik={formik} />
          <Divider />
          <ImageUploader formik={formik} />
          <Divider />
          <Interest formik={formik} name="hobby" />
          <Divider />
          <Describe formik={formik} name="desc" />
          <Divider />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProvider;
