import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Typography } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function FreeService({ formik }) {
  const [freeServices, setFreeServices] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDefaultSet, setIsDefaultSet] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8181/services/free")
      .then((response) => {
        setFreeServices(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const options = freeServices.map((service) => ({
    id: service.id,
    title: service.name,
    type: service.type.id,
  }));

  const isOptionSelected = (option) => {
    return selectedOptions.some((service) => service.id === option.id);
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedOptions(value);
    formik.setFieldValue("freeService",  value.map((option) => option.id));
  };

  useEffect(() => {
    if (!isDefaultSet && options.length > 0) {
      const defaultServices = options.filter((option) => option.type === 2);
      if (defaultServices) {
        setSelectedOptions([defaultServices]);
        formik.setFieldValue("freeService", [defaultServices.id]);
        setIsDefaultSet(true);
      }
    }
  }, [options, isDefaultSet, formik]);

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Dịch vụ miễn phí
      </Typography>
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
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
