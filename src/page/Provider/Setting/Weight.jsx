import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Weight({ formik }) {
  const { values } = formik;

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    formik.setFieldValue("weight", newValue);
  };

  return (
    <>
      <Stack>
        <Typography variant="subtitle2" gutterBottom>
          Cân nặng
        </Typography>
        <TextField
          multiline
          sx={{ width: 300 }}
          name="weight"
          value={values.weight}
          onChange={handleInputChange}
        />
      </Stack>
    </>
  );
}

