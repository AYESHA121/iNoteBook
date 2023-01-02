import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password === cpassword) {
      const response = await fetch(
        "https://inotebook-345.herokuapp.com//api/auth/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/login");
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid details", "danger");
      }
    } else {
      props.showAlert("Passwords do not match", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-2">
      <h2 className="my-2">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter your Name</label>
          <input
            type="text"
            className="form-control my-2"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            value={credentials.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            value={credentials.email}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            value={credentials.password}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            value={credentials.cpassword}
            minLength={5}
            required
          />
        </div>
        <button
          disabled={
            credentials.name.length === 0 ||
            credentials.email.length === 0 ||
            credentials.password.length === 0 ||
            credentials.cpassword.length === 0
          }
          type="submit"
          className="btn btn-primary my-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
