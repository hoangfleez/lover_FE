import { Autocomplete, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";

export default function BasicService({ formik }) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

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

  const options = services.map((service) => ({
    id: service.id,
    title: service.name,
    type: service.type.id,
  }));

  const isOptionEqualToValue = (option, value) => {
    return option?.id === value?.id;
  };

  const handleServiceChange = (_, newValue) => {
    if (newValue !== selectedService) {
      setSelectedService(newValue);
      formik.setFieldValue("mainService", newValue ? newValue : "");
    }
  };

  useEffect(() => {
    const defaultService = options.find((option) => option.type === 1);
    if (defaultService && !selectedService) {
      setSelectedService(defaultService);
      formik.setFieldValue("mainService", defaultService);
    }
  }, [options, selectedService, formik]);

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Dịch vụ
      </Typography>
      <Autocomplete
        disablePortal
        id="basic-service-autocomplete"
        options={options}
        value={selectedService}
        onChange={handleServiceChange}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={isOptionEqualToValue}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
