import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Price({ formik }) {
  const { values, handleChange } = formik;

  return (
    <Stack>
      <TextField
        fullWidth
        multiline
        label="Giá"
        name="price"
        value={values.price}
        onChange={handleChange}
      />
    </Stack>
  );
}