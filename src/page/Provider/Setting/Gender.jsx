import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Stack, Typography } from "@mui/material";

export default function Gender({ formik }) {
  console.log(formik)
  const handleChange = (event) => {
    formik.setFieldValue("sex", event.target.value);
  };

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Giới tính
      </Typography>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={formik.values.sex}
          onChange={handleChange}
        >
          <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
          <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
