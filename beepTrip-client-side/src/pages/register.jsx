import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./../services/user";
import { toast } from "react-toastify";

const Register = ({ updateUser, redirect }) => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const currentUser = { ...user };
    currentUser[e.currentTarget.name] = e.currentTarget.value;
    setUser(currentUser);
  };
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const { username, password, email } = e.target;
      const user = {
        username: username.value,
        password: password.value,
        email: email.value,
      };
      const { data } = await registerUser(user);
      toast.success(data.message, { autoClose: 2500 });
      updateUser(data.user);
      navigate(redirect);
    } catch (e) {
      toast.error(e.response.data, { autoClose: 2500 });
    }
  };

  return (
    <React.Fragment>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-2">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            onChange={handleChange}
            value={user.username}
            className="form-control"
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            value={user.email}
            className="form-control"
            type="text"
            id="email"
            name="email"
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            onChange={handleChange}
            value={user.password}
            className="form-control"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success">Register</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
