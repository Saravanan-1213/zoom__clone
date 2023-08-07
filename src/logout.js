import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  navigate("/");
  return (
    <Button variant="contained" onClick={() => navigate("/")}>
      LOGOUT
    </Button>
  );
};

export default Logout;
