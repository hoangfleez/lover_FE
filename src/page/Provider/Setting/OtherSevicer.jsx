import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState, useEffect } from "react";
import axios from "axios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function OtherService({ name, value, onChange }) {
  const [moreServices, setMoreServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8181/services/more")
      .then((response) => {
        console.log(response.data.data);
        setMoreServices(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleServiceChange = (event, newValue) => {
    onChange({ target: { name, value: newValue } });
  };

  const options = moreServices.map((service) => ({
    id: service.id,
    title: service.name,
  }));

  return (
    <Autocomplete
      sx={{ width: 300 }}
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      value={value}
      onChange={handleServiceChange}
      renderInput={(params) => (
        <TextField {...params} label="Dịch vụ mở rộng" />
      )}
    />
  );
}
