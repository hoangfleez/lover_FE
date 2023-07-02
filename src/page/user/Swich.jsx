import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showProviderByUser } from "../../services/providerService";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function CustomizedSwitches() {
  const dispatch = useDispatch();

  const [isServiceOn, setIsServiceOn] = useState(false); // State lưu trạng thái bật/tắt dịch vụ

  const profile = useSelector((state) => state.provider.profile);
  const ready = profile?.ready;

  const handleOn = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8181/providers/publicProvider/${profile?.id}`,
        { ready: "1" }
      );
      console.log("Bật dịch vụ thành công");
      setIsServiceOn(true); // Cập nhật state khi bật dịch vụ thành công
    } catch (error) {
      console.error("Lỗi khi bật dịch vụ:", error);
    }
  };

  const handleOff = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8181/providers/privateProvider/${profile?.id}`,
        { ready: "0" }
      );
      console.log("Tắt dịch vụ thành công");
      setIsServiceOn(false); // Cập nhật state khi tắt dịch vụ thành công
    } catch (error) {
      console.error("Lỗi khi tắt dịch vụ:", error);
    }
  };

  const handleSwitchChange = (event) => {
    if (event.target.checked) {
      handleOn();
    } else {
      handleOff();
    }
  };

  useEffect(() => {
    setIsServiceOn(ready === "1");
  }, [ready]);

  useEffect(() => {
    dispatch(showProviderByUser());
  }, []);

  return (
    <FormControlLabel
      control={
        <Android12Switch checked={isServiceOn} onChange={handleSwitchChange} />
      }
    />
  );
}
