import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Container, Typography } from "@mui/material";
import ShowAll from "./ShowAll";
import { useDispatch } from "react-redux";




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                padding: "0 95px",
              }}
            >
              {children}
            </Box>
          </Container>
        </Box>
      )}
    </div>
  );
}

const CustomTab = ({ label, ...props }) => {
  return (
    <Tab
      sx={{
        borderRadius: "8px",
        backgroundColor: "customBtnColor.backgroundColor",
        color: "customBtnColor.color",
        margin: "10px",
        padding: "0 15px",
        minHeight: "35px",
        textTransform: "none",
        "&.Mui-selected": {
          backgroundColor: "customSelected.backgroundColor",
          color: "customSelected.color",
        },
      }}
      label={label}
      {...props}
    />
  );
};

const arr = [
  { id: "1", name: "Tất cả" },
  { id: "2", name: "Ra mắt người nhà" },
  { id: "3", name: "Ra mắt bạn bè" },
  { id: "4", name: "Du lịch chung cùng nhóm bạn" },
  { id: "5", name: "Đi chơi chung" },
  { id: "6", name: "Tham dự sinh nhật" },
  { id: "7", name: "Trò chuyện offline" },
  { id: "8", name: "Trò chuyện online" },
  { id: "9", name: "Đi chơi tết" },
  { id: "10", name: "Đi chơi ngày lễ" },
];

export default function BodyLists({ service, setService }) {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);
  const [showService, setShowService] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            position: "fixed",
            zIndex: 1,
            backgroundColor: "customColorSchemes.basicColor",
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          {arr.map((item) => (
            <CustomTab key={item.id} label={item.name} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ marginTop: "48px" }}>
        <TabPanel value={value} index={0}>
          <ShowAll service={service} setService={setService} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShowAll service={service} setService={setService} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Ra mat ban be
        </TabPanel>
        <TabPanel value={value} index={3}>
          Du lich vs nhom ban
        </TabPanel>
        <TabPanel value={value} index={4}>
          Di choi chung
        </TabPanel>
        <TabPanel value={value} index={5}>
          Tham du sinh nhat
        </TabPanel>
        <TabPanel value={value} index={6}>
          Nc online
        </TabPanel>
        <TabPanel value={value} index={7}>
          Nc offline
        </TabPanel>
        <TabPanel value={value} index={8}>
          Đi chơi tết
        </TabPanel>
        <TabPanel value={value} index={9}>
          Đi chơi ngày lễ
        </TabPanel>
      </Box>
    </Box>
  );
}
