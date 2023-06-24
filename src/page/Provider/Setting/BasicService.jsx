import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BasicService({ formik }) {
  const { service } = formik.values;
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8181/services/basic")
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const options = services.map((service) => service.name);

  const handleServiceChange = (event, newValue) => {
    formik.setFieldValue("service", newValue || "");
  };

  const isOptionEqualToValue = (option, value) => {
    return option === value || option?.name === value?.name;
  };

  return (
    <Autocomplete
      disablePortal
      id="basic-service-autocomplete"
      options={options}
      value={service}
      onChange={handleServiceChange}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Dịch vụ" />}
    />
  );
}