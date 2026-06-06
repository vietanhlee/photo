import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="h5" color="inherit">
          LÊ VIỆT ANH
        </Typography>
        <Typography variant="h6" color="inherit">
          {props.context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

