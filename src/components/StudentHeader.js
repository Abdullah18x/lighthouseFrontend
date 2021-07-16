import React, { Component } from "react";
import NavLink from "./../pages/NavLink.js";
import { Link } from "@reach/router";
const logout = require("../axios/logout");
const ls = require("local-storage");
const student = require("../axios/student");

class StudentHeader extends Component {
  state = {
    studentId: ls.get('studentId'),
    userType: ls.get('userType'),
    token: ls.get('token'),
    name: "",
  };

  getStudent = async () => {
    let returnedStudent = await student.getStudent(
      this.state.studentId,
      this.state.token
    );
    this.setState({
      name: returnedStudent[0].name,
    });
  };
  logout = async () => {
    let userId = ls("studentId");
    let userType = ls("userType");
    let token = ls.get("token");
    let response = await logout.logOutStudent(userId, userType, token);
    ls.clear();
    console.log(response);
    window.location.href = "/";
  };
  componentDidMount(){
    this.getStudent()
  }
  render() {
    return (
      <div className="app">
        <div className="layout is-side-nav-dark">
          <div className="header">
            <div className="logo logo-dark">
              <NavLink to="/student/">
                <img src="../assets/images/logo/logo.png" alt="Logo" />
                <img
                  className="logo-fold"
                  src="../assets/images/logo/logo-fold.png"
                  alt="Logo"
                />
              </NavLink>
            </div>
            <div className="logo logo-white">
              <NavLink to="/student/">
                <img src="../assets/images/logo/logo-white.png" alt="Logo" />
                <img
                  className="logo-fold"
                  src="../assets/images/logo/logo-fold-white.png"
                  alt="Logo"
                />
              </NavLink>
            </div>
            <div className="nav-wrap">
              <ul className="nav-left">
                <li className="desktop-toggle">
                  <a href="javascript:void(0);">
                    <i className="anticon" />
                  </a>
                </li>
                <li className="mobile-toggle">
                  <a href="javascript:void(0);">
                    <i className="anticon" />
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    data-toggle="modal"
                    data-target="#search-drawer"
                  >
                    <i className="anticon anticon-search" />
                  </a>
                </li>
              </ul>
              <ul className="nav-right">

                <li className="dropdown dropdown-animated scale-left">
                  <div className="pointer" data-toggle="dropdown">
                    <div className="avatar avatar-image  m-h-10 m-r-15">
                      <img src="../assets/images/avatars/thumb.jpg" alt="" />
                    </div>
                  </div>
                  <div className="p-b-15 p-t-20 dropdown-menu pop-profile">
                    <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                      <div className="d-flex m-r-50">
                        <div className="avatar avatar-lg avatar-image">
                          <img
                            src="../assets/images/avatars/thumb.jpg"
                            alt=""
                          />
                        </div>
                        <div className="m-l-10">
                          <p className="m-t-15 text-dark font-weight-semibold">
                            {this.state.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      className="dropdown-item d-block p-h-15 p-v-10"
                      to="/student/settings"
                      state={{}}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <i className="anticon opacity-04 font-size-16 anticon-lock" />
                          <span className="m-l-10">Account Setting</span>
                        </div>
                        <i className="anticon font-size-10 anticon-right" />
                      </div>
                    </Link>
                    {/* <a
                      href="javascript:void(0);"
                      className="dropdown-item d-block p-h-15 p-v-10"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <i className="anticon opacity-04 font-size-16 anticon-project" />
                          <span className="m-l-10">Projects</span>
                        </div>
                        <i className="anticon font-size-10 anticon-right" />
                      </div>
                    </a> */}
                    <button
                      type="button"
                      onClick={this.logout}
                      className="dropdown-item d-block p-h-15 p-v-10"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <i className="anticon opacity-04 font-size-16 anticon-logout" />
                          <span className="m-l-10">Logout</span>
                        </div>
                        <i className="anticon font-size-10 anticon-right" />
                      </div>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="side-nav">
            <div className="side-nav-inner">
              <ul className="side-nav-menu scrollable">
                <li className="nav-item dropdown open">
                  <NavLink className to="/student/">
                    <span className="icon-holder">
                      <i className="anticon anticon-dashboard" />
                    </span>
                    <span className="title">Dashboard</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                {/* <li className="nav-item dropdown">
                  <NavLink className="dropdown-toggle" to="/student/mail">
                    <span className="icon-holder">
                      <i className="anticon anticon-inbox" />
                    </span>
                    <span className="title">Mail</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li> */}
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/student/assignments"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-bars" />
                    </span>
                    <span className="title">Assignments</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/student/gradedAssignment"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-bars" />
                    </span>
                    <span className="title">Graded Assignments</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                {/* <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/student/view-assignment"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-bars" />
                    </span>
                    <span className="title">Registeration</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li> */}
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/student/feedback"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-bars" />
                    </span>
                    <span className="title">Feedback</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>

                {/* <li className="nav-item dropdown">
                  <NavLink className="dropdown-toggle" to="/student/profile">
                    <span className="icon-holder">
                      <i className="anticon anticon-lock" />
                    </span>
                    <span className="title">Profile</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className="dropdown-toggle" to="/student/settings">
                    <span className="icon-holder">
                      <i className="anticon anticon-setting" />
                    </span>
                    <span className="title">Setting</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default StudentHeader;
