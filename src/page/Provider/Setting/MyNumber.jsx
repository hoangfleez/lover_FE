import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/system";

export default function MyNumber() {
  const user = useSelector((state) => {
    return state.user.profile.data;
  });

  return (
    <Stack direction={"column"}>
      <Stack>
        <Typography variant="subtitle2" gutterBottom>
          Số CCCD/CMTND
        </Typography>
        <>
          <TextField
            disabled
            fullWidth
            multiline
            defaultValue={user?.numberCard}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CheckIcon sx={{ color: "green" }} />
                </InputAdornment>
              ),
            }}
          />
        </>
      </Stack>
      <Stack direction={"row"} spacing={1} mt={1} mb={3}>
        <Box sx={{ width: "50%", height: "200px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Mặt trước
          </Typography>
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={`${user?.afterImageCard}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${user?.afterImageCard}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
        </Box>
        <Box sx={{ width: "50%", height: "200px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Mặt sau
          </Typography>
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={`${user?.beforeImageCard}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${user?.beforeImageCard}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
        </Box>
      </Stack>
    </Stack>
  );
}
