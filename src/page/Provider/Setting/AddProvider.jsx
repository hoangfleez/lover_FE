import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addProvider } from "../../../services/providerService";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import Birthday from "./Birthday";
import NickName from "./NickName";
import Other from "./Other";
import Interest from "./Interest";

import Price from "./Price";
import BasicService from "./ BasicService";
import Describe from "./ Describe";

const AddProvider = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.idUser;

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
      image: "",
      service: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const newProvider = {
        ...values,
        user: userId,
      };

      await dispatch(addProvider(newProvider));
    },
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Cai dat dich vu
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack width={"45%"} gap={3}>
          <NickName formik={formik} name="name" />
          <Divider />
          <Stack direction={"row"} spacing={4}>
            <BasicService formik={formik} name="service" />
            <Price formik={formik} name="price" />
          </Stack>
          <Divider />
          <Other formik={formik} />
          <Divider />
          <Birthday formik={formik} name="dob" />
          <Divider />
          <Interest formik={formik} name="hobby" />
          <Divider />
          <Describe formik={formik}  name="desc"/>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AddProvider;
