// import { Button, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";
// import "./App.css";
// function Login() {
//   const navigate = useNavigate();
//   const [formState, setFormState] = useState("success");
//   const { handleChange, values, handleSubmit } = useFormik({
//     initialValues: { username: "", password: "" },
//     onSubmit: async (values) => {
//       console.log(values);

//       const data = await fetch("http://localhost:4000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       if (data.status == 401) {
//         console.log("❌ERROR");
//         setFormState("error");
//       } else {
//         const result = await data.json();
//         console.log("✅SUCCESS", result);
//         localStorage.setItem("token", result.token);
//         navigate("/user");
//       }
//     },
//   });
//   return (
//     <div>
//       <div className="log-container">
//         <h1>WELCOME TO ZOOM APP</h1>
//         <img
//           className="log-img"
//           src="https://www.gifgifgifgifgif.com/wp-content/uploads/2023/07/EquatorialBlissfulAmbushbug-size_restricted.gif"
//         />
//         <form onSubmit={handleSubmit} className="login-form">
//           <h2 className="login-title"> LOGIN </h2>
//           <TextField
//             label="Username"
//             variant="outlined"
//             onChange={handleChange}
//             value={values.username}
//             name="username"
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             onChange={handleChange}
//             value={values.password}
//             name="password"
//           />
//           <Button
//             color={formState}
//             className="login-btn"
//             type="submit"
//             variant="contained"
//           >
//             {formState == "error" ? "Retry" : "Login"}
//           </Button>
//           <Link to="/signup">Don't have an Account</Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React from "react";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const Auth = () => {
  return (
    <div className="auth">
      <Logo />
      <Login />
      <Register />
    </div>
  );
};

//Login
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://zoom-backend-rmto.onrender.com/auth/login",
        {
          username,
          password,
        }
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/user");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

// Register
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://zoom-backend-rmto.onrender.com/auth/signup", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div>
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              required={true}
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              required={true}
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">{label}</button>
        </form>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <div>
      <h1 className="hero1">WELCOME TO ZOOM APP</h1>

      <img
        className="log-img"
        src="https://www.gifgifgifgifgif.com/wp-content/uploads/2023/07/EquatorialBlissfulAmbushbug-size_restricted.gif"
      />
    </div>
  );
};
