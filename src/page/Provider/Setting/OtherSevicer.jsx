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

export default function OtherService({ formik }) {
  const [moreServices, setMoreServices] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8181/services/more")
      .then((response) => {
        setMoreServices(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const options = moreServices.map((service) => ({
    id: service.id,
    title: service.name,
    type: service.type.id
  }));

  const isOptionSelected = (option) => {
    return selectedOptions.some((service) => service.id === option.id);
  };

  const handleAutocompleteChange = (event, value) => {
    if (value.length > selectedOptions.length) {
      // Lựa chọn mới được thêm vào
      const newlySelectedOption = value[value.length - 1];
      if (isOptionSelected(newlySelectedOption)) {
        // Bỏ lựa chọn nếu đã được chọn trước đó
        const updatedOptions = selectedOptions.filter(
          (option) => option.id !== newlySelectedOption.id
        );
        setSelectedOptions(updatedOptions);
        formik.setFieldValue("otherService", updatedOptions);
        return;
      }
    }
  
    setSelectedOptions(value);
    formik.setFieldValue("otherService", value);
  };
  return (
    <Autocomplete
      sx={{ width: 300 }}
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      value={selectedOptions}
      onChange={handleAutocompleteChange}
      renderOption={(props, option) => {
        const selected = isOptionSelected(option);

        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Dịch vụ mở rộng" />
      )}
    />
  );
}
