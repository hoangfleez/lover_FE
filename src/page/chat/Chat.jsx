import React, { useState, useEffect } from "react";

import {
  Paper,
  Typography,
  TextField,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
// import socket from "../../socket/socket";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showAllChat } from "../../services/chatService";
import UserProfile from "./UserProfile";

const ChatComponent = ({ openChat, setOpenChat }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      const res = await dispatch(showAllChat());
      setConversations(res.payload);
    };

    getConversations();
  }, [user]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      setMessages([...messages, { text: message, sender: "me" }]);
      setMessage("");
    }
  };

  const handleToggleChat = () => {
    setOpenChat(false);
  };
  const clickIcon = () => {
    setOpenChat(true);
  };

  return (
    <div>
      {!openChat ? (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "20px",
          }}
        >
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => {
              handleToggleChat;
              clickIcon();
            }}
          >
            <ChatIcon />
          </Fab>
        </div>
      ) : (
        <div style={{ display: "inline-flex" }}>
          <Paper
            elevation={3}
            style={{
              position: "fixed",
              bottom: "0px",
              right: "10px",
              width: "600px",
              height: "400px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "100%",
                borderRight: "1px solid #ccc",
              }}
            >
              <List>
                {conversations.map((conversations) => {
                  <UserProfile  conversations={conversations}/>;
                })}
              </List>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="h6">Chat</Typography>
                <IconButton aria-label="close" onClick={handleToggleChat}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div
                style={{
                  height: "300px",
                  overflowY: "scroll",
                  padding: "10px",
                }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "me" ? "flex-end" : "flex-start",
                      marginBottom: "10px",
                    }}
                  >
                    <Paper
                      elevation={2}
                      style={{
                        maxWidth: "70%",
                        padding: "5px 10px",
                        borderRadius:
                          msg.sender === "me"
                            ? "5px 5px 0 5px"
                            : "5px 5px 5px 0",
                        background: msg.sender === "me" ? "#e0e0e0" : "#3f51b5",
                        color: msg.sender === "me" ? "black" : "white",
                      }}
                    >
                      {msg.text}
                    </Paper>
                  </div>
                ))}
              </div>
              <div style={{ padding: "2px" }}>
                <TextField
                  fullWidth
                  type="text"
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Hãy viết gì đó..."
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        color="secondary"
                        aria-label="send"
                        onClick={handleSendMessage}
                      >
                        <SendIcon fontSize="small" />
                      </IconButton>
                    ),
                  }}
                />
              </div>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
