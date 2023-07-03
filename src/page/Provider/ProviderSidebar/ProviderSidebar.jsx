import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView, TreeItem } from "@mui/lab";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import SettingsIcon from "@mui/icons-material/Settings";
import BlockIcon from "@mui/icons-material/Block";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function ProviderSidebar() {
  const [expanded, setExpanded] = React.useState(
    localStorage.getItem("expanded") ? localStorage.getItem("expanded") : ["10"]
  );
  const [selected, setSelected] = React.useState(
    localStorage.getItem("selected") ? localStorage.getItem("selected") : 13
  );

  const navigate = useNavigate();

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeId) => {
    setSelected(nodeId);
  };

  useEffect(() => {
    const savedExpanded = localStorage.getItem("expanded");
    const savedSelected = localStorage.getItem("selected");

    if (savedExpanded) {
      setExpanded(JSON.parse(savedExpanded));
    }

    if (savedSelected) {
      setSelected(savedSelected);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expanded", JSON.stringify(expanded));
    localStorage.setItem("selected", selected);
  }, [expanded, selected]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TreeView
        aria-label="Trình duyệt hệ thống tập tin"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        sx={{ height: "100%", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        <TreeItem nodeId="10" label="TRANG CUNG CẤP DỊCH VỤ">
          <TreeItem
            nodeId="13"
            label="Cài đặt dịch vụ"
            icon={<SettingsIcon />}
            onClick={() => {
              navigate("/provider_setting ");
            }}
          />

          <TreeItem
            nodeId="14"
            label="Lịch sử nhật đặt"
            icon={<HistoryIcon />}
            onClick={() => {
              navigate("/provider_setting/pendingProvider");
            }}
          />
          <TreeItem
            nodeId="16"
            label="Đơn đang thực hiện"
            icon={<HistoryToggleOffIcon />}
            onClick={() => {
              navigate("/provider_setting/acceptProvider");
            }}
          />
          <TreeItem
            nodeId="15"
            label="Danh sách từ chối"
            icon={<BlockIcon />}
            onClick={() => {
              navigate("/provider_setting/rejectProvider");
            }}
          />
          <TreeItem
              nodeId="19"
              label="Danh sách thành công"
              icon={<CheckCircleIcon />}
              onClick={() => {
                navigate("/provider_setting/doneProvider");
              }}
          />
        </TreeItem>
      </TreeView>
    </Box>
  );
}
