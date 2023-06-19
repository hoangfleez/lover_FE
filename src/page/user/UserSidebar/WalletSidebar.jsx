import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, ListItem, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkIcon from "@mui/icons-material/Link";

export default function WalletSidebar({ selectedLine, setSelectedLine }) {
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
        <Typography>VÍ ĐIỆN TỬ</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
                  style={{ color: selectedLine === 26 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(26)}
                >
                  Thông tin
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 27 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(27)}
                >
                  Lịch sử
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <Typography p={2}>
            <ListItem
              sx={{ padding: 0 }}
              style={{ color: selectedLine === 28 ? "red" : "inherit" }}
              onClick={() => handleLineClick(28)}
            >
              <LinkIcon fontSize="small" sx={{ marginRight: "10px" }} />
              <ListItemText primary="Link Pay" />
            </ListItem>
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
