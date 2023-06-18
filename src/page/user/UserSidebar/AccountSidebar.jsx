import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, ListItem, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import WalletIcon from "@mui/icons-material/Wallet";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import { Link, useNavigate } from "react-router-dom";

export default function AccountSidebar({
  selectedLine,
  setSelectedLine,
  expanded,
  setExpanded,
}) {
  const navigate = useNavigate();

  const handleLineClick = (index) => {
    setSelectedLine(index);
  };
  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setSelectedLine(1); // Thiết lập thông tin cá nhân là mục được chọn khi component được render
    setExpanded(true);
  }, []);
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleAccordionToggle}
      >
        <Typography>TÀI KHOẢN</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <Link
            to="/customer_info"
            style={{
              textDecoration: "none",
              color: selectedLine === 1 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(1)}
          >
            <ListItem p={2}>
              <PersonIcon fontSize="small" sx={{ marginRight: "10px" }} />

              <ListItemText primary="Thông tin cá nhân" />
            </ListItem>
          </Link>
        </Accordion>
        <Accordion>
          <ListItem
            p={2}
            style={{
              color: selectedLine === 2 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(2)}
          >
            <FormatListNumberedIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
            <ListItemText primary="Thống kê" />
          </ListItem>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <ListItem sx={{ padding: 0 }}>
              <SettingsIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Cài đặt" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Box ml={7}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 3 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => {
                  setSelectedLine(3);
                  navigate("email");
                }}
              >
                Email
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 4 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(4)}
              >
                Tài khoản và mật khẩu
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 5 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(5)}
              >
                Khóa bảo vệ
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 6 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(6)}
              >
                Vip
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 7 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(7)}
              >
                Hiển thị
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2b-content"
            id="panel2b-header"
          >
            <ListItem sx={{ padding: 0 }}>
              <HistoryIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Lịch sử giao dịch" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    color: selectedLine === 8 ? "red" : "inherit",
                    transition: "color 0.3s",
                  }}
                  onClick={() => handleLineClick(8)}
                >
                  Lịch sử donate
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    color: selectedLine === 9 ? "red" : "inherit",
                    transition: "color 0.3s",
                  }}
                  onClick={() => handleLineClick(9)}
                >
                  Lịch sử duo
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    color: selectedLine === 10 ? "red" : "inherit",
                    transition: "color 0.3s",
                  }}
                  onClick={() => handleLineClick(10)}
                >
                  Lịch sử tạo code
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    color: selectedLine === 11 ? "red" : "inherit",
                    transition: "color 0.3s",
                  }}
                  onClick={() => handleLineClick(11)}
                >
                  Biến động số dư
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    color: selectedLine === 12 ? "red" : "inherit",
                    transition: "color 0.3s",
                  }}
                  onClick={() => handleLineClick(12)}
                >
                  Lịch sử mua thẻ
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <ListItem
            p={2}
            style={{
              color: selectedLine === 13 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(3)}
          >
            <PaymentIcon fontSize="small" sx={{ marginRight: "10px" }} />
            <ListItemText primary="Thanh toán" />
          </ListItem>
        </Accordion>
        <Accordion>
          <ListItem
            p={2}
            style={{
              color: selectedLine === 14 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(14)}
          >
            <WalletIcon fontSize="small" sx={{ marginRight: "10px" }} />
            <ListItemText primary="Ví" />
          </ListItem>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
