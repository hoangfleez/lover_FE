import { Stack, Typography } from "@mui/material";
import React from "react";
import OtherSevicer from "./OtherSevicer";
import FreeSevicer from "./FreeSevicer";

export default function Other({ name, value, onChange }) {
  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Dịch vụ khác
      </Typography>
      <Stack direction={"column"} gap={2}>
        <Stack>
          <OtherSevicer  name={name} value={value} onChange={onChange}/>
        </Stack>
        <Stack>
          <FreeSevicer  name={name} value={value} onChange={onChange}/>
        </Stack>
      </Stack>
    </Stack>
  );
}
