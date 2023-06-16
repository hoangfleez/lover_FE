import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { addErrorIntoField } from "../utils";

const TextFields = ({ placeholder, control, name, errors , type,}) => {
  return (
    <>
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...addErrorIntoField(errors[name])}
              margin="normal"
              name={name}
              placeholder={placeholder}
              type={type}
            />
          )}
        />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
      </FormControl>
    </>
  );
};

export default TextFields;
