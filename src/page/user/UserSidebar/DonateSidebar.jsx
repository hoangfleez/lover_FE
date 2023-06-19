import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { ListItem, ListItemText } from "@mui/material";

export default function DonateSidebar({selectedLine, setSelectedLine}) {

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
        <Typography>DONATE</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <ListItem
            sx={{ padding: 0 }}
            style={{
              color: selectedLine === 41 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(41)}
          >
            <SettingsIcon fontSize="small" sx={{ marginRight: "10px" }} />
            <ListItemText primary="Cài đặt" />
          </ListItem>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
