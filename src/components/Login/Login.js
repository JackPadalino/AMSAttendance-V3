import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
      navigate("/");
    }
  };

  const attemptLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    loginWithToken(token);
  };

  if(token) return <p>You are already logged in.</p>
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={attemptLogin} className="loginRegForm">
          <input placeholder="username" value={credentials.username} name="username" onChange={onChange}/>
          <input placeholder="password" name="password" value={credentials.password} onChange={onChange}/>
          <button>Login</button>
      </form>
      {/* <div className="registerAccount">
          <Link to="/register">Need an account?</Link>
      </div> */}
    </div>
  );
};

export default Login;