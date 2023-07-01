import React, { useState } from "react";
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
// const { io } = require("socket.io-client");

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false); // Trạng thái ẩn/hiện khung chat

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const handleToggleChat = () => {
    setShowChat(!showChat); // Toggle trạng thái ẩn/hiện khi click vào
  };

  return (
    <div>
      {!showChat ? (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "20px",
          }}
        >
          <Fab color="secondary" aria-label="add" onClick={handleToggleChat}>
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
                width: "150px",
                height: "100%",
                borderRight: "1px solid #ccc",
                backgroundColor: "customColorSchemes.backgroundColor",
              }}
            >
              <List>
                {/* Hiển thị danh sách người chat */}
                <ListItem button>
                  <ListItemText primary="User 1" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="User 2" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="User 3" />
                </ListItem>
                {/* Thêm các mục người chat khác ở đây */}
              </List>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  backgroundColor: "customColorSchemes.backgroundColor",
                  borderBottom:"1px solid #ccc"
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
                  backgroundColor: "customColorSchemes.backgroundColor",
                }}
              >
                <ul>
                  {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  padding: "2px",
                  backgroundColor: "customColorSchemes.backgroundColor",
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Type your message..."
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
