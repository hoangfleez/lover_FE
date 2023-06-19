import {Divider, Drawer, Toolbar} from "@mui/material";
import React from "react";
import Extended from "../../checkbox/ExtendedService";

export default function SiderBar({setService}) {
    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: "300px",
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: "300px", boxSizing: "border-box"},
                }}
            >
                <Toolbar/>
                <Divider/>
                <Extended setService={setService}/>

            </Drawer>
        </>
    );
}
