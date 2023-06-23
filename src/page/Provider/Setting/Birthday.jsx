import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack, Typography } from "@mui/material";

export default function Birthday({ formik }) {
  const { values } = formik;
  const [value, setValue] = React.useState(dayjs(values.dob, "MM/DD/YYYY"));

  const handleInputChange = (newValue) => {
    setValue(newValue);
    formik.setFieldValue("dob", newValue.format("MM/DD/YYYY"));
  };

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Sinh nhật
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleInputChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Stack>
  );
}
