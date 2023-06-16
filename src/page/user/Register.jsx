import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextFields from "../../components/TextFields";
import { register } from "../../services/useService";
// import { email } from "../../utils";
import { Padding } from "@mui/icons-material";
import Email from "../../components/Email";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const schema = yup.object({
  username: yup
    .string()
    .required("Không được để trống!")
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: yup
    .string()
    .required("Không được để trống!")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  // email: yup
  //   .string()
  //   .required("Không được để trống!")
  //   .matches(email, "Sai định dạng email"),
});

export default function Register(props) {
  const dispatch = useDispatch();

  const [showInput, setShowInput] = React.useState(false);

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      username: "",
      // email: "",
    },
    resolver: yupResolver(schema),
  });

  const handleChangeLogin = () => {
    props.setSignIn(false);
  };

  const [message, setMessage] = React.useState("");

  const onSubmit = (user) => {
    dispatch(register(user)).then((data) => {
      if (data.payload === "tai khoan da ton tai") {
        setMessage("Tài khooản đã tồn tại!! Hãy chọn tài khooản khác.");
      } else {
        setMessage("");
        handleChangeLogin();
        reset()
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <VolunteerActivismIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <TextFields
            errors={errors}
            control={control}
            name="username"
            label="Tên đăng nhập"
          />
          {message ? (
            <>
              <Typography color="error.main" variant="span" fontSize="14px">
                {message}
              </Typography>
            </>
          ) : (
            ""
          )}
          <TextFields
            errors={errors}
            control={control}
            name="password"
            label="Mật khẩu"
            type="password"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  props.setSignIn(false);
                }}
              >
                Bạn đã có tài khoản? Đăng nhập ngay.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
