import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

export default function PersonalPageSidebar() {
  const [selectedLine, setSelectedLine] = useState(null);

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
        <Typography>TRANG CÁ NHÂN</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Hashtags</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              ml={7}
              style={{ color: selectedLine === 1 ? "red" : "inherit" }}
              onClick={() => handleLineClick(1)}
            >
              <Typography variant="subtitle2" gutterBottom>
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
            <Typography>Cài đặt</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 2 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(2)}
                >
                  Url
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 3 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(3)}
                >
                  Mạng xã hội
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 4 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(4)}
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
            aria-controls="panel1b-content"
            id="panel1b-header"
          >
            <Typography>Mục tiêu</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 5 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(5)}
                >
                  Cài đặt
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 6 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(6)}
                >
                  Lịch sử
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
            <Typography>Thành viên</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box ml={7}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 7 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(7)}
                >
                  Bậc
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 8 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(8)}
                >
                  Danh sách thành viên
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: selectedLine === 9 ? "red" : "inherit" }}
                  onClick={() => handleLineClick(9)}
                >
                  Lịch sử đăng ký
                </Typography>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{ color: selectedLine === 10 ? "red" : "inherit" }}
            onClick={() => handleLineClick(10)}
          >
            Thanh toán
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{ color: selectedLine === 11 ? "red" : "inherit" }}
            onClick={() => handleLineClick(11)}
          >
            Danh sách chặn comment
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
