import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, ListItem, ListItemText } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import AdjustIcon from "@mui/icons-material/Adjust";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";

export default function PersonalPageSidebar({ selectedLine, setSelectedLine }) {
  const navigate = useNavigate();
  const handleLineClick = (index) => {
    setSelectedLine(index);
  };



  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>TRANG CÁ NHÂN</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <ListItem sx={{ padding: 0 }}>
              <SellIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Lịch sử giao dịch" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Box ml={7}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{ color: selectedLine === 15 ? "red" : "inherit" }}
                onClick={() => handleLineClick(15)}
              >
                Dành cho sáng tạo nội dung
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
              <SettingsIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Cài đặt" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 16 ? "red" : "inherit" }}
                  onClick={() => {
                    handleLineClick(16);
                    navigate("/user_setting/url");
                  }}
                >
                  Url
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 17 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(17)}
                >
                  Mạng xã hội
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 18 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(18)}
                >
                  Hiển thị
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItem sx={{ padding: 0 }}>
              <GroupsIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Thành viên" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 20 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(20)}
                >
                  Bậc
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 21 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(21)}
                >
                  Danh sách thành viên
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 22 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(22)}
                >
                  Lịch sử đăng ký
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1b-content"
            id="panel1b-header"
          >
            <ListItem sx={{ padding: 0 }}>
              <AdjustIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Mục tiêu" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 23 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(23)}
                >
                  Cài đặt
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 24 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(24)}
                >
                  Lịch sử
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <Typography
            p={2}
            style={{ color: selectedLine === 25 ? "red" : "inherit" }}
            onClick={() => handleLineClick(25)}
          >
            <ListItem sx={{ padding: 0 }}>
              <BlockIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Danh sách chặn comment " />
            </ListItem>
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
