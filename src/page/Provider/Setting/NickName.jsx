import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function NickName({ formik, name }) {
  const { value } = formik.values;

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    formik.setFieldValue(name, newValue);
  };

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Nick name
      </Typography>
      <TextField
        fullWidth
        multiline
        name={name}
        value={value}
        onChange={handleInputChange}
      />
    </Stack>
  );
}