import { Box, Button, FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
// import { addErrorIntoField } from "../utils"
import ErrorMessage from "./ErrorMessage";
import { addErrorIntoField } from "../utils";

const Email = ({ label, control, name, errors, type }) => {
  return (
    <>
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", alignItems:"center", gap:1 }}>
              <TextField
                {...field}
                {...addErrorIntoField(errors[name])}
                margin="normal"
                required
                name={name}
                label={label}
                type={type}
              />
              <Button color="success" variant="contained" sx={{height:"80%"}}>gui</Button>
            </Box>
          )}
        />
        {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
      </FormControl>
    </>
  );
};

export default Email;
