import { Mail, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

const UserIcons = () => {



  



  

















  
  const user = useSelector(({ user }) => {
    return user.currentUser;
  });

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    <Box>
      <IconButton size="large" >
        <Badge color="error" badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size="large" >
        <Badge color="error" badgeContent={20}>
          <Notifications />
        </Badge>
      </IconButton>
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={user?.avatar} alt={user?.avatar}>
            {user?.firstname?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  );
};

export default UserIcons;
