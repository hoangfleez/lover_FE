import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function LinkFB({ formik }) {

  const handleInputChange = (event) => {
    formik.setFieldValue("linkFB", event.target.value)
  };

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Link facebook
      </Typography>
      <TextField
        fullWidth
        multiline
        onChange={handleInputChange}
      />
    </Stack>
  );
}