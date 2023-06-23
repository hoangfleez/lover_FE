import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BasicService({ formik }) {
  const { value } = formik.values;
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

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options || []} // Provide a default empty array if services is falsy
      value={value}
      onChange={handleServiceChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Dịch vụ" />}
    />
  );
}
