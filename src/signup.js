import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      console.log(values);

      const data = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await data.json();
      console.log("✅SUCCESS", result);
      navigate("/");
    },
  });

  return (
    <div className="container">
      <h1>WELCOME TO ZOOM Clone APP</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Signup</h2>

        <TextField
          label="Username"
          variant="outlined"
          onChange={handleChange}
          value={values.username}
          name="username"
        />
        <TextField
          label="Password"
          variant="outlined"
          onChange={handleChange}
          value={values.password}
          name="password"
        />
        <Button type="sumbit" variant="contained">
          Signup
        </Button>
        <div>
          <Link to="/">Already Signup</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
