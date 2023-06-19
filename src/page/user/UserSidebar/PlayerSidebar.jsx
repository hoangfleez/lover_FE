import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, ListItem, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BlockIcon from "@mui/icons-material/Block";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function PlayerSidebar(
  // selectedLine,
  // setSelectedLine,
  expanded,
  setExpanded
) {
  const [selectedLine, setSelectedLine] = React.useState(null);
  const navigate = useNavigate();

  const handleLineClick = (index) => {
    setSelectedLine(index);
  };
  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };
  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    setOpen((prevOpen) => !prevOpen);
    localStorage.setItem("openState", JSON.stringify(!open));
  };

  useEffect(() => {
    const selectedLineKey = localStorage.getItem("selectedLineKey");
    const parsedSelectedLine = parseInt(selectedLineKey);

    if (!isNaN(parsedSelectedLine)) {
      setSelectedLine(parsedSelectedLine);
    }
    const openState = JSON.parse(localStorage.getItem("openState"));
    if (openState) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedLineKey", selectedLine);
  }, [selectedLine]);
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleAccordionToggle}
      >
        <Typography>NGƯỜI CUNG CẤP DỊCH VỤ</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 29 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(29)}
          >
            <ListItem sx={{ padding: 0 }}>
              <PersonIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Tổng quan " />
            </ListItem>
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 30 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(30)}
          >
            <ListItem sx={{ padding: 0 }}>
              <GroupIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Khách hàng thân thiết" />
            </ListItem>
          </Typography>
        </Accordion>
        <Accordion expanded={open}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            onClick={changeOpen}
          >
            <ListItem sx={{ padding: 0 }}>
              <SettingsIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Cài đặt" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Box ml={7}>
              {/* <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 31 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(31)}
              >
                Url
              </Typography> */}
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 32 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => {
                  handleLineClick(32);
                  navigate("/user_setting/url");
                }}
              >
                Thông tin Player
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 33 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(33)}
              >
                Albums Player
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 34 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(34)}
              >
                Cài đặt dou
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: selectedLine === 35 ? "red" : "inherit",
                  transition: "color 0.3s",
                }}
                onClick={() => handleLineClick(35)}
              >
                Khác
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
              <CalendarMonthIcon
                fontSize="small"
                sx={{ marginRight: "10px" }}
              />
              <ListItemText primary="Lịch sử nhận dou,donate" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    color: selectedLine === 36 ? "red" : "inherit",
                    transition: "color 0.3s",
                  }}
                  onClick={() => handleLineClick(36)}
                >
                  Lịch sử nhận duo
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    color: selectedLine === 37 ? "red" : "inherit",
                    transition: "color 0.3s",
                  }}
                  onClick={() => handleLineClick(37)}
                >
                  Lịch sử nhận donate
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 38 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(38)}
          >
            <ListItem sx={{ padding: 0 }}>
              <BlockIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Danh sách chặn User" />
            </ListItem>
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 39 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(39)}
          >
            <ListItem sx={{ padding: 0 }}>
              <LibraryBooksIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Huớng dẫn Player" />
            </ListItem>
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 40 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(40)}
          >
            <ListItem sx={{ padding: 0 }}>
              <LinkIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Link Player " />
            </ListItem>
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
