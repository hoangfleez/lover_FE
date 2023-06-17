import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

export default function AccountSidebar() {
  const [selectedLine, setSelectedLine] = useState(null);

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
        <Typography>Tài khoản</Typography>
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
            Thông tin cá nhân
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
            Thông kê
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
            <Typography>Lịch sử giảo dịch</Typography>
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
          <Typography
            p={2}
            style={{
              color: selectedLine === 13 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(13)}
          >
            Thanh toán
          </Typography>
        </Accordion>
        <Accordion>
          <Typography
            p={2}
            style={{
              color: selectedLine === 14 ? "red" : "inherit",
              transition: "color 0.3s",
            }}
            onClick={() => handleLineClick(14)}
          >
            Ví
          </Typography>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
