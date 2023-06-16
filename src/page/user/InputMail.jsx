// import { Button, FormControl, Grid, TextField } from "@mui/material";
// import { Controller } from "react-hook-form";
// import { useState } from "react";
// import { addErrorIntoField } from "../../utils";
// import validator from 'validator'

// const InputMail = ({ placeholder, control, name, errors, type }) => {
//   const [showInput, setShowInput] = useState(false);
//   const [emailValue, setEmailValue] = useState("");
//   const [errRegex, setErrRegex] = useState("");

//   const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;

//   const handleInputChange = (event) => {
//     setEmailValue(event.target.value);
//   };

//   const handleButtonChange = () => {
//     if (emailRegex.test(emailValue)) {
//       setShowInput(true);
//       setErrRegex("");
//     } else {
//       setShowInput(false);
//       setErrRegex("Sai định dạng email");
//     }
//   };

//   return (
//     <>
//       <FormControl fullWidth sx={{ mb: "1rem" }}>
//         <Controller
//           name={name}
//           control={control}
//           render={({ field }) => (
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={9}>
//                 <TextField
//                   {...field}
//                   {...addErrorIntoField(errors[name])}
//                   fullWidth
//                   margin="normal"
//                   name={name}
//                   placeholder={placeholder}
//                   type={type}
//                   value={emailValue}
//                   onChange={handleInputChange}
//                 />
//               </Grid>

//               <Grid item xs={3}>
//                 {showInput ? (
//                   <TextField fullWidth margin="normal" placeholder="OTP" />
//                 ) : (
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     onClick={handleButtonChange}
//                   >
//                     Gửi
//                   </Button>
//                 )}
//               </Grid>
//               {errors.email && (
//                 <Grid item xs={12}>
//                   <div style={{ color: "red", fontSize: "14px" }}>
//                     {errors.email.message || errRegex}
//                   </div>
//                 </Grid>
//               )}
//             </Grid>
//           )}
//         />
//       </FormControl>
//     </>
//   );
// };

// export default InputMail;
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { addErrorIntoField } from "../../utils";
import ErrorMessage from "../../components/ErrorMessage";

const InputMail = ({ placeholder, control, name, errors, type }) => {
  const [showInput, setShowInput] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [errRegex, setErrRegex] = useState("");
  const [style, setStyle] = useState(false);

  const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;

  const handleInputChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handleButtonChange = () => {
    if (emailRegex.test(emailValue)) {
      setErrRegex("");
      setStyle(true);
      setShowInput(true);
    } else {
      setShowInput(false);
      setErrRegex("Sai định dạng email");
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={9}>
                <TextField
                  {...field}
                  {...addErrorIntoField(errors[name])}
                  fullWidth
                  margin="normal"
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  value={emailValue}
                  disabled={style}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={3}>
                {showInput ? (
                  <TextField fullWidth margin="normal" placeholder="OTP" />
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleButtonChange}
                  >
                    Gửi
                  </Button>
                )}
              </Grid>
              {errors.email && (
                <Grid item xs={12}>
                  {/* <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.email.message}
                  </div> */}
                  {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
                </Grid>
              )}
              <Grid item xs={12}>
                <div style={{ color: "red", fontSize: "14px" }}>{errRegex}</div>
              </Grid>
            </Grid>
          )}
        />
      </FormControl>
    </>
  );
};

export default InputMail;
