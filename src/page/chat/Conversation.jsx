import { Avatar, ListItem, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Conversation({ conversation, me }) {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId =
      conversation.user1.id !== me.id
        ? conversation.user1.id
        : conversation.user2.id;

    const getUser = async (friendId) => {
      try {
        const res = await axios.get(`http://127.0.0.1:8181/users/${friendId}`);;
        setFriend(res.data.data); // giả sử dữ liệu của người bạn được trả về trong phản hồi
      } catch (e) {
        console.log(e);
      }
    };
    getUser(friendId);
  }, [me, conversation]);

  return (
    <>
      <Avatar
        src={friend?.avatar}
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
        }}
      />
      <Typography variant="h6">{friend?.username}</Typography>
    </>
  )
}
