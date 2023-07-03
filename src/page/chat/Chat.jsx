import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  TextField,
  Fab,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { showAllChat, getChat, sendMessage } from "../../services/chatService";
import Message from "./Message";
import Conversation from "./Conversation";
import { io } from "socket.io-client";

const ChatComponent = ({ openChat, setOpenChat }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const me = useSelector((state) => {
    return state.user.profile.data;
  });

  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5555");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.content,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", me?.id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      const res = await dispatch(showAllChat());
      setConversations(res.payload);
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await dispatch(getChat(currentChat?.id));
        setMessages(res.payload);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleToggleChat = () => {
    setOpenChat(false);
  };

  const clickIcon = () => {
    setOpenChat(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      content: newMsg,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat.user1 !== me.id ? currentChat.user1 : currentChat.user2;

    socket.current.emit("sendMessage", {
      id: me.id,
      receiverId,
      content: newMsg,
    });

    try {
      const res = await dispatch(sendMessage(message));
      setNewMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
              handleToggleChat();
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
                {conversations.map((c) => (
                  <ListItem
                    button
                    sx={{ gap: "10px" }}
                    onClick={() => setCurrentChat(c)}
                    key={c.id}
                  >
                    <Conversation conversation={c} me={me} />
                  </ListItem>
                ))}
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
                ref={scrollRef}
                style={{
                  height: "300px",
                  overflowY: "scroll",
                  padding: "10px",
                }}
              >
                {currentChat ? (
                  <>
                    {messages?.map((m) => (
                      <div key={m.id}>
                        <Message
                          message={m}
                          own={m?.sender?.id === me?.id}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <span>Không có tin nhắn</span>
                )}
              </div>
              <div style={{ padding: "2px" }}>
                <TextField
                  fullWidth
                  type="text"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Hãy viết gì đó..."
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
