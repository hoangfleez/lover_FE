import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Register from "./Register";
import Login from "./Login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  WebkitBoxShadow: "14px 11px 19px 5px rgba(0,0,0,0.63)",
  MozBoxShadow: " 14px 11px 19px 5px rgba(0,0,0,0.63)",
  boxShadow: " 14px 11px 19px 5px rgba(0,0,0,0.63)",
};

export default function BasicModal({ open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [signIn, setSignIn] = React.useState(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            {signIn ? (
              <Register setSignIn={setSignIn}  />
            ) : (
              <Login setSignIn={setSignIn} setOpen={setOpen} />
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}



