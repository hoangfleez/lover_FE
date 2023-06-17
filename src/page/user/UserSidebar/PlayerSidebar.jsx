import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

export default function PlayerSidebar() {
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
        <Typography>PLAYER</Typography>
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
            Tổng quan
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 2 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(2)}
          >
            Khách hàng thân thiết
          </Typography>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Cài đặt</Typography>
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
                onClick={() => handleLineClick(3)}
              >
                Url
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
                Thông tin Player
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
                Albums Player
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
                Cài đặt dou
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
            <Typography>Lịch sử nhận dou,donate</Typography>
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
                  Lịch sử nhận duo
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
              color: selectedLine === 10 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(10)}
          >
            Danh sách chặn User
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 11 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(11)}
          >
            Huớng dẫn Player
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 12 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(12)}
          >
            Link Player
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
