import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("success");
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      console.log(values);

      const data = await fetch(
        "https://zoom-backend-awl3.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (data.status == 401) {
        console.log("❌ERROR");
        setFormState("error");
      } else {
        const result = await data.json();
        console.log("✅SUCCESS", result);
        localStorage.setItem("token", result.token);
        navigate("/user");
      }
    },
  });
  return (
    <div className="container-login">
      <h1 className="login-h1">WELCOME TO ZOOM Clone APP</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title"> LOGIN </h1>
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
