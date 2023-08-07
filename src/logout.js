import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  navigate("/");
  return (
    <Button variant="contained" onClick={() => navigate("/")}>
      logout
    </Button>
  );
};

export default Logout;
