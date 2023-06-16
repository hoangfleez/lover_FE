
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

export default function Extended({ setService }) {
  const handleCheckboxChange = (event) => {
    const checkedService = event.target.name;
    if (event.target.checked) {
      setService((prevService) => [...prevService, checkedService]);
    } else {
      setService((prevService) =>
        prevService.filter((item) => item !== checkedService)
      );
    }
  };
  return (
    <FormGroup sx={{ paddingLeft: "10px" }}>
      <h2>Dịch vụ mở rộng </h2>
      <Box
        sx={{ display: "flex", flexDirection: "column", paddingLeft: "20px" }}
      >
        <FormControlLabel
          control={<Checkbox onChange={handleCheckboxChange} name="hontay" />}
          label="Hôn tay"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckboxChange} name="om" />}
          label="Ôm"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckboxChange} name="nhongnheo" />
          }
          label="Nhõng nhẽo"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckboxChange} name="cuchithanmat" />
          }
          label="Cử chỉ thân mật"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckboxChange} name="noiloiyeu" />
          }
          label="Nói lời yêu"
        />
      </Box>
    </FormGroup>
  );
}
