import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

export default function WalletSidebar() {
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
        <Typography>VÍ ĐIỆN TỬ</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2b-content"
            id="panel2b-header"
          >
            <Typography>Cài đặt</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 1 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(1)}
                >
                  Thông tin
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 2 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(2)}
                >
                  Lịch sử
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{ color: selectedLine === 3 ? "red" : "inherit" }}
            onClick={() => handleLineClick(3)}
          >
            Link Pay
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
