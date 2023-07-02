import { Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function Message({ massage, own }) {
  console.log(massage);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: own ? "flex-end" : "flex-start",
          marginBottom: "10px",
        }}
      >
        <Avatar
          alt="Avatar"
          src={massage?.sender?.avatar} // Thay "avatarUrl" bằng đường dẫn đến ảnh avatar của tin nhắn
          style={{
            marginRight: own ? "0" : "8px",
            marginLeft: own ? "8px" : "0",
          }}
        />
        <Stack>
          <Paper
            elevation={2}
            style={{
              maxWidth: "70%",
              padding: "5px 10px",
              borderRadius: own ? "15px" : "15px",
              background: own ? "#e0e0e0" : "#3f51b5",
              color: own ? "black" : "white",
            }}
          >
            {massage?.content}
          </Paper>
          <Typography variant="caption" display="block" gutterBottom>
            {massage?.conversation?.createdAt}
          </Typography>
        </Stack>
      </div>
    </>
  );
}
