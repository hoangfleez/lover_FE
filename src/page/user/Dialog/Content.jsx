import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MyNumber from "./MyNumber";
import { Stack } from "@mui/material";
import BeforeMyNumberImg from "./BeforeMyNumberImg";
import AffterMyNumberImg from "./AffterMyNumberImg";
import { useFormik } from "formik";
import { useUserProfile } from "../../../customHook/useUserProfile";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import { editUser } from "../../../services/useService";
import Swal from "sweetalert2";

const steps = ["Nhập CCCD/CMTND", "Chụp 2 mặt CCCD/CMTND"];

export default function Content({ setOpenRegister }) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const profile = useUserProfile();

  const close = () => {
    setOpenRegister(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const formik = useFormik({
    initialValues: {
      update: "pending",
      numberCard: "",
      beforeImageCard: "",
      afterImageCard: "",
    },
    onSubmit: (values) => {
      const { ...rest } = values;
      const newProfile = {
        id: profile.id,
        ...rest,
      };

      dispatch(editUser(newProfile))
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Gửi thông tin thành cônng hãy đợi phê duyệt",
            showConfirmButton: false,
            timer: 2000,
          });
          setOpenRegister(false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {profile.update === "pending" ? (
        <Stack sx={{ width: "100%" }} textAlign={"center"}>
          <Typography variant="h3" gutterBottom color={"green"}>
            <TaskAltIcon sx={{ fontSize: "100px" }} />
          </Typography>
          <Typography variant="h3" gutterBottom color={"green"}>
            Thông tin của bạn đã được gửi đi.
          </Typography>
          <Typography variant="h3" gutterBottom color={"green"}>
            Hãy đợi admin phê duyệt
          </Typography>
        </Stack>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Stack alignItems={"center"}>
                <Typography
                  sx={{ mt: 2, mb: 1 }}
                  variant="h4"
                  gutterBottom
                  color={"green"}
                >
                  Hãy ấn "Gửi" để gửi thông tin tới admin
                </Typography>
                <Typography sx={{ mt: 2, mb: 1 }} color={"red"}>
                  (Hoặc ấn "Cài lại" để cài đặt lại thông tin)
                </Typography>
              </Stack>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Cài lại</Button>
                <Button type="submit">Gửi</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && <MyNumber formik={formik} />}
              {activeStep === 1 && (
                <Stack p={5} direction={"row"} justifyContent={"space-between"}>
                  <BeforeMyNumberImg formik={formik} />
                  <AffterMyNumberImg formik={formik} />
                </Stack>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>Next</Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      )}
    </form>
  );
}
