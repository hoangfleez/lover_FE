import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HomeIcon from '@mui/icons-material/Home';


export default function InforButton() {
  return (
    <Box sx={{ flexGrow: 1, padding:"15px" }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth startIcon={<FavoriteIcon/>} sx={{bgcolor:"white"}}>
            Theo dõi
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth sx={{bgcolor:"white"}}>
            Cài đặt
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth startIcon={<ChatBubbleOutlineIcon/>} disabled>
            Chat
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth disabled>
            Donate
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth sx={{bgcolor:"white"}}>
            Đang theo dõi
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" textTransform="none" fullWidth sx={{bgcolor:"white"}}>
            Album
          </Button>
        </Grid>

      </Grid>
      <Button fullWidth variant="contained" startIcon={<HomeIcon/>} sx={{marginTop:"5px", padding:"10px",bgcolor:"red" }}>
        Khu thành viên
      </Button>
    </Box>
  );
}
