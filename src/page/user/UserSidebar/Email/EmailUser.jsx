import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useUserProfile } from "../../../../customHook/useUserProfile";

export default function EmailUser() {
  const profile = useUserProfile();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "40px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Email
      </Typography>
      <Box sx={{ width: "70ch", marginTop: "50px" }}>
        <Box>
          <Typography variant="overline" gutterBottom>
            Email
          </Typography>
          <TextField
            disabled
            fullWidth
            multiline
            defaultValue={profile?.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CheckIcon sx={{ color: "green" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider sx={{ marginTop: 3 }} />
        <Box sx={{ marginTop: 3 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              padding: "10px",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
          >
            Xoa
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
