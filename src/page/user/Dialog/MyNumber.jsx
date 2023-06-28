import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function MyNumber({ formik }) {
  const { values, handleChange } = formik;

  return (
    <Stack p={10} sx={{ width: "70%", marginLeft: "160px" }}>
      <Typography variant="subtitle2" gutterBottom>
        Số CCCD/CMTND
      </Typography>
      <TextField
        multiline
        name="numberCard"
        value={values.name}
        onChange={handleChange}
      />
    </Stack>
  );
}
