import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("success");
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      console.log(values);

      const data = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status == 401) {
        console.log("❌ERROR");
        setFormState("error");
      } else {
        const result = await data.json();
        console.log("✅SUCCESS", result);
        window.localStorage.setItem("token", result.token);
        //localStorage.setItem("token", result.token);
        navigate("/user");
      }
    },
  });
  return (
    <div className="log-container">
      <h1>WELCOME TO ZOOM Clone APP</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title"> LOGIN </h2>
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
        <Button
          color={formState}
          className="login-btn"
          type="submit"
          variant="contained"
        >
          {formState == "error" ? "Retry" : "Login"}
        </Button>
        <Link to="/signup">Don't have an Account</Link>
      </form>
    </div>
  );
}

export default Login;
