import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
// import { addErrorIntoField } from "../utils"
import ErrorMessage from "../components/ErrorMessage";
import { addErrorIntoField } from "../utils";

const TextFields = ({ label, control, name, errors , type,}) => {
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
              required
              name={name}
              label={label}
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
