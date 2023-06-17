import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DonateSidebar() {
  const [selectedLine, setSelectedLine] = React.useState(null);

  const handleLineClick = (index) => {
    setSelectedLine(index === selectedLine ? null : index);
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
          <Typography
            p={2}
            style={{
              color: selectedLine === 1 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(1)}
          >
            Cài đặt
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
