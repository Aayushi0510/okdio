import React from "reactn";
// library
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Drawer, CssBaseline } from "@mui/material";
// components
import { NavSection, Scrollbar } from "src/components";
import sidebarConfig from "./SidebarConfig";
// hooks
import { useWindowSize } from "src/hooks";

export default function DashboardSidebar({ isOpenSidebar }) {
  const location = useLocation();
  const [windowWidth] = useWindowSize();

  const drawerWidth = windowWidth > 1000 ? 334 : "auto";
  const anchor = windowWidth > 1000 ? "left" : "top";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor={anchor}
        open={isOpenSidebar}
      >
        <Scrollbar
          sx={{
            height: "100%",
            backgroundColor: "#FCFBF9",
            "& .simplebar-content": {
              height: "100%",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <NavSection navConfig={sidebarConfig} anchor={anchor} />

          <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
      </Drawer>
    </Box>
  );
}
