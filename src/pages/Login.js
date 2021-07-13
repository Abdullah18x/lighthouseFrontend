import React, { Component } from "react";
import NavLink from "./NavLink.js";
const requestInfo = require("../axios/login");
const ls = require("local-storage");

class Login extends Component {
  state = {
    userType: "student",
    userName: "",
    password: "",
  };

  setUsername = (event) => {
    let value = event.target.value;
    this.setState({
      userName: value,
    });
  };

  setPassword = (event) => {
    let value = event.target.value;
    this.setState({
      password: value,
    });
  };

  changeUserType = (event) => {
    let value = event.target.value;
    this.setState({
      userType: value,
    });
  };

  Login = async () => {
    if (this.state.userType === "admin") {
      let response = await requestInfo.adminLogin(
        this.state.userName,
        this.state.password
      );
      console.log(response);
      if (response.adminId) {
        ls.clear();
        ls("adminId", response.adminId);
        ls("userType", 1);
        ls("token", response.token);
        window.location.href = "/admin";
      } else {
        alert("Invalid login");
      }
    } else if (this.state.userType === "teacher") {
      let response = await requestInfo.teacherLogin(
        this.state.userName,
        this.state.password
      );
      if (response.lecturerId) {
        ls.clear();
        ls("teacherId", response.lecturerId);
        ls("userType", 2);
        ls("token", response.token);
        window.location.href = "/teacher";
      } else {
        alert("Invalid login");
      }
    } else if (this.state.userType === "student") {
      let response = await requestInfo.studentLogin(
        this.state.userName,
        this.state.password
      );
      if (response.studentId) {
        ls.clear();
        ls("studentId", response.studentId);
        ls("userType", 3);
        ls("token", response.token);
        window.location.href = "/student";
      } else {
        alert("Invalid login");
      }
    }
  };
  render() {
    return (
      <div className="app">
        <div className="container-fluid p-0 h-100">
          <div className="row no-gutters h-100 full-height">
            <div
              className="col-lg-5 d-none d-lg-flex bg"
              style={{
                backgroundImage: 'url("assets/images/others/login-bg.jpg")',
              }}
            >
              <div className="d-flex h-100 p-h-40 p-v-15 flex-column justify-content-between">
                <div>
                  <img src="assets/images/logo/logo-white.png" alt="" />
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-white">© 2020 COMSATS University </span>
                  <ul className="list-inline">
                    <span>For Testing Purposes Only</span>
                    <li className="list-inline-item">
                      <NavLink className="text-white text-link" to="/student/">
                        | Student
                      </NavLink>
                    </li>
                    <li className="list-inline-item">
                      <NavLink className="text-white text-link" to="/admin/">
                        | Admin
                      </NavLink>
                    </li>
                    <li className="list-inline-item">
                      <NavLink className="text-white text-link" to="/teacher/">
                        | Teacher
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-7 bg-white">
              <div className="container h-100">
                <div className="row no-gutters h-100 align-items-center">
                  <div className="col-md-8 col-lg-7 col-xl-6 mx-auto">
                    <h2>Sign In</h2>
                    <p className="m-b-30">
                      Enter your credential to get access
                    </p>
                    <form>
                      <div className="form-group">
                        <label
                          className="font-weight-semibold"
                          htmlFor="userName"
                        >
                          Username:
                        </label>
                        <div className="input-affix">
                          <i className="prefix-icon anticon anticon-user" />
                          <input
                            type="text"
                            className="form-control"
                            id="userName"
                            placeholder="Username"
                            onChange={(e) => this.setUsername(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="font-weight-semibold"
                          htmlFor="password"
                        >
                          Password:
                        </label>
                        <a className="float-right font-size-13 text-muted" href>
                          Forget Password?
                        </a>
                        <div className="input-affix m-b-10">
                          <i className="prefix-icon anticon anticon-lock" />
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => this.setPassword(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputState">User</label>
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => {
                            this.changeUserType(e);
                          }}
                        >
                          <option value="student" selected>
                            Student
                          </option>
                          <option value="teacher">Teacher</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <br />
                      <div className="form-group">
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.Login}
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
