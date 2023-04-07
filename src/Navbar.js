import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

const Navbar = () => {
  // const [value, setValue] = useState(0)

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography textAlign={"center"} variant="h5">
            Video Chat
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
