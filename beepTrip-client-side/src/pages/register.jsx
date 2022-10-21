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
      <div class="container d-flex justify-content-center align-items-center mt-5">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <div class="card shadow">
              <img
                src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                alt=""
                class="card-img-top"
              />
              <div class="card-body">
                <form onSubmit={handleRegister}>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      autoFocus
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
                  <div className="mb-3 mt-3">
                    <button className="btn btn-success btn-block">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
