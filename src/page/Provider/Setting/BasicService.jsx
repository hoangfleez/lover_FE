import { Autocomplete, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";

export default function BasicService({ formik }) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [services2, setServices2] = useState({ id: "", title: "", type: "" });

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

  useEffect(() => {
    const arr = [];
    if (formik?.initialValues.service) {
      for (let i of formik.initialValues.service) {
        console.log(i.service.type.id);
        if (i.service.type.id === 1) {
          let a = {
            id: i.service.id,
            title: i.service.name,
            type: i.service.type.id,
          };
          setServices2(a);
          arr.push(a);
        }
      }
    }
  }, [formik]);

  const options = services.map((service) => ({
    id: service.id,
    title: service.name,
    type: service.type.id,
  }));

  const isOptionEqualToValue = (option, value) => {
    return option?.id === value?.id;
  };

  const handleServiceChange = (_, newValue) => {
    setServices2(newValue);
    formik.setFieldValue("mainService", newValue ? newValue : "");
  };

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Dịch vụ
      </Typography>

      <Autocomplete
        disablePortal
        id="basic-service-autocomplete"
        options={options}
        value={services2}
        onChange={handleServiceChange}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={isOptionEqualToValue}
        sx={{ width: 300 }}
        renderInput={(params) => {
          console.log(params);
          return <TextField {...params} />;
        }}
      />
    </Stack>
  );
}
