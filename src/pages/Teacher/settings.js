import React, { Component } from "react";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class Settings extends React.Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    userName: "",
    name:'',
    email: "",
    password: "",
    defaultEmail: "",
    defaultPassword: "",
    verifyPassword: "",
    loggedIn: true,
  };

  verification = async () => {
    let verifyToken = await auth.verifyToken(
      this.state.lecturerId,
      this.state.userType,
      this.state.token
    );
    if (verifyToken.length === 0) {
      this.setState({
        loggedIn: false,
      });
    } else {
      if (verifyToken.expired === 1) {
        this.setState({
          loggedIn: false,
        });
      }
    }
  };
  getTeacher = async () => {
    let returnedteacher = await lecturer.getUser(
      this.state.lecturerId,
      this.state.token
    );
    console.log(returnedteacher)
    this.setState({
        name: returnedteacher.name,
      userName: returnedteacher.userName,
      email: returnedteacher.email,
      defaultEmail: returnedteacher.email,
      password: returnedteacher.password,
      defaultPassword: returnedteacher.password,
    });
  };

  setName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  setEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  setPassword2(event) {
    this.setState({
      verifyPassword: event.target.value,
    });
  }

  updateProfile = async () => {
    
      await lecturer.updateProfile(
        this.state.lecturerId,
        this.state.name,
        this.state.email,
        this.state.token
      );
      this.getTeacher();
  };

  updatePassword = async () => {
    if (this.state.password !== this.state.defaultPassword) {
      if (this.state.password === this.state.verifyPassword) {
        await lecturer.updatePassword(
          this.state.lecturerId,
          this.state.password,
          this.state.token
        );
        this.getTeacher();
      } else {
        alert("Passwords Do not match");
      }
    }
  };

  componentDidMount() {
    if (
        this.state.lecturerId === null ||
        this.state.lecturerId === undefined ||
        this.state.userType === null ||
        this.state.userType === undefined ||
        this.state.token === null ||
        this.state.token === undefined
    ) {
      this.setState({
        loggedIn: false,
      });
      window.location.href = "/error";
    } else {
      this.verification();
    }
    if (this.state.loggedIn) {
      this.getTeacher();
    }
  }

  isLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <div className="main-content">
            <div className="page-header no-gutters has-tab">
              <h2 className="font-weight-normal">Settings</h2>
            </div>
            <div className="container">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Basic Infomation</h4>
                </div>
                <div className="card-body">
                  <div className="media align-items-center">
                    <div
                      className="avatar avatar-image  m-h-10 m-r-15"
                      style={{ height: "80px", width: "80px" }}
                    >
                      <img src="./../assets/images/avatars/thumb.jpg" alt="" />
                    </div>
                    <div className="m-l-20 m-r-20">
                      <h5 className="m-b-5 font-size-18">Change Avatar</h5>
                      <p className="opacity-07 font-size-13 m-b-0">
                        Recommended Dimensions: <br />
                        120x120 Max fil size: 5MB
                      </p>
                    </div>
                    <div>
                      <button className="btn btn-tone btn-primary">
                        Upload
                      </button>
                    </div>
                  </div>
                  <hr className="m-v-25" />
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label
                          className="font-weight-semibold"
                          htmlFor="userName"
                        >
                          User Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          placeholder="User Name"
                          disabled
                          defaultValue={this.state.userName}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label
                          className="font-weight-semibold"
                          htmlFor="userName"
                        >
                        Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          placeholder="Name"
                          onChange={(e) => {
                            this.setName(e);
                          }}
                          defaultValue={this.state.name}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label className="font-weight-semibold" htmlFor="email">
                          Email:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="email"
                          onChange={(e) => {
                            this.setEmail(e);
                          }}
                          defaultValue={this.state.email}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <button
                          type="button"
                          onClick={this.updateProfile}
                          className="btn btn-primary m-t-30"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Change Password</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label
                          className="font-weight-semibold"
                          htmlFor="oldPassword"
                        >
                          Old Password:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="oldPassword"
                          placeholder="Old Password"
                          defaultValue={this.state.defaultPassword}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label
                          className="font-weight-semibold"
                          htmlFor="newPassword"
                        >
                          New Password:
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          onChange={(e) => {
                            this.setPassword(e);
                          }}
                          placeholder="New Password"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label
                          className="font-weight-semibold"
                          htmlFor="confirmPassword"
                        >
                          Confirm Password:
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          onChange={(e) => {
                            this.setPassword2(e);
                          }}
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <button
                          type="button"
                          onClick={this.updatePassword}
                          className="btn btn-primary m-t-30"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="footer-content">
              <p className="m-b-0">
                Copyright © 2020 COMSATS University. All rights reserved.
              </p>
              <span></span>
            </div>
          </footer>
        </div>
      );
    } else {
      window.location.href = "/error";
    }
  };

  render() {
    return <div className="page-container">{this.isLoggedIn()}</div>;
  }
}

export default Settings;
