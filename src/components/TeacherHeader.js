import React, { Component } from "react";
import NavLink from "./../pages/NavLink.js";
const logout = require("../axios/logout");
const ls = require("local-storage");

class TeacherHeader extends Component {
  logout = async () => {
    let userId = ls("teacherId");
    let userType = ls("userType");
    let token = ls.get("token");
    let response = await logout.logOutTeacher(userId, userType, token);
    ls.clear();
    console.log(response);
    window.location.href = "/";
  };
  render() {
    return (
      <div className="app">
        <div className="layout is-side-nav-dark">
          <div className="header">
            <div className="logo logo-dark">
              <NavLink to="/teacher">
                <img src="./../assets/images/logo/logo.png" alt="Logo" />
                <img
                  className="logo-fold"
                  src="./../assets/images/logo/logo-fold.png"
                  alt="Logo"
                />
              </NavLink>
            </div>
            <div className="logo logo-white">
              <NavLink to="/teacher">
                <img src="./../assets/images/logo/logo-white.png" alt="Logo" />
                <img
                  className="logo-fold"
                  src="./../assets/images/logo/logo-fold-white.png"
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
                  <a href="javascript:void(0);" data-toggle="dropdown">
                    <i className="anticon anticon-bell notification-badge" />
                  </a>
                  <div className="dropdown-menu pop-notification">
                    <div className="p-v-15 p-h-25 border-bottom d-flex justify-content-between align-items-center">
                      <p className="text-dark font-weight-semibold m-b-0">
                        <i className="anticon anticon-bell" />
                        <span className="m-l-10">Notification</span>
                      </p>
                      <a
                        className="btn-sm btn-default btn"
                        href="javascript:void(0);"
                      >
                        <small>View All</small>
                      </a>
                    </div>
                    <div className="relative">
                      <div
                        className="overflow-y-auto relative scrollable"
                        style={{ maxHeight: "300px" }}
                      >
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item d-block p-15 border-bottom"
                        >
                          <div className="d-flex">
                            <div className="avatar avatar-blue avatar-icon">
                              <i className="anticon anticon-mail" />
                            </div>
                            <div className="m-l-15">
                              <p className="m-b-0 text-dark">
                                You received a new mail
                              </p>
                              <p className="m-b-0">
                                <small>8 min ago</small>
                              </p>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item d-block p-15 border-bottom"
                        >
                          <div className="d-flex">
                            <div className="avatar avatar-cyan avatar-icon">
                              <i className="anticon anticon-alert" />
                            </div>
                            <div className="m-l-15">
                              <p className="m-b-0 text-dark">New Assignment</p>
                              <p className="m-b-0">
                                <small>7 hours ago</small>
                              </p>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item d-block p-15 border-bottom"
                        >
                          <div className="d-flex">
                            <div className="avatar avatar-green avatar-icon">
                              <i className="anticon anticon-check-circle" />
                            </div>
                            <div className="m-l-15">
                              <p className="m-b-0 text-dark">
                                Assignment Returned
                              </p>
                              <p className="m-b-0">
                                <small>8 hours ago</small>
                              </p>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item d-block p-15 "
                        >
                          <div className="d-flex">
                            <div className="avatar avatar-red avatar-icon">
                              <i className="anticon anticon-warning" />
                            </div>
                            <div className="m-l-15">
                              <p className="m-b-0 text-dark">
                                You have a new update
                              </p>
                              <p className="m-b-0">
                                <small>2 days ago</small>
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown dropdown-animated scale-left">
                  <div className="pointer" data-toggle="dropdown">
                    <div className="avatar avatar-image  m-h-10 m-r-15">
                      <img src="./../assets/images/avatars/thumb.jpg" alt="" />
                    </div>
                  </div>
                  <div className="p-b-15 p-t-20 dropdown-menu pop-profile">
                    <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                      <div className="d-flex m-r-50">
                        <div className="avatar avatar-lg avatar-image">
                          <img
                            src="./../assets/images/avatars/thumb.jpg"
                            alt=""
                          />
                        </div>
                        <div className="m-l-10">
                          <p className="m-t-15 text-dark font-weight-semibold">
                            Ali Zain
                          </p>
                          {/* <p className="m-b-0 opacity-07">UI/UX Desinger</p> */}
                        </div>
                      </div>
                    </div>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item d-block p-h-15 p-v-10"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <i className="anticon opacity-04 font-size-16 anticon-user" />
                          <span className="m-l-10">View Profile</span>
                        </div>
                        <i className="anticon font-size-10 anticon-right" />
                      </div>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item d-block p-h-15 p-v-10"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <i className="anticon opacity-04 font-size-16 anticon-lock" />
                          <span className="m-l-10">Account Setting</span>
                        </div>
                        <i className="anticon font-size-10 anticon-right" />
                      </div>
                    </a>
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
                  <NavLink className to="/teacher">
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
                                <NavLink className="dropdown-toggle" to="/teacher/chat">
                                    <span className="icon-holder">
                                        <i className="anticon anticon-message" />
                                    </span>
                                    <span className="title">Chat</span>
                                    <span className="arrow">
                                        <i className="arrow-icon" />
                                    </span>
                                </NavLink>
                            </li> */}
                {/* <li className="nav-item dropdown">
                  <NavLink className="dropdown-toggle" to="/teacher/mail">
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
                  <NavLink className="dropdown-toggle" to="/teacher/students">
                    <span className="icon-holder">
                      <i className="anticon anticon-inbox" />
                    </span>
                    <span className="title">View Students</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/teacher/studentCallibration"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-inbox" />
                    </span>
                    <span className="title">Callibrate Students</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/teacher/pendingRequests"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-inbox" />
                    </span>
                    <span className="title">View Pending Requests</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/teacher/assignments"
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
                    to="/teacher/add-assignment"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-bars" />
                    </span>
                    <span className="title">Add Assignment</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/teacher/assignedAssignments"
                  >
                    <span className="icon-holder">
                      <i className="anticon anticon-bars" />
                    </span>
                    <span className="title">Assigned Assignments</span>
                    <span className="arrow">
                      <i className="arrow-icon" />
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="dropdown-toggle"
                    to="/teacher/feedback"
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
                                <NavLink className="dropdown-toggle" to="/teacher/preview">
                                    <span className="icon-holder">
                                        <i className="anticon anticon-bars" />
                                    </span>
                                    <span className="title">Preview Assignment</span>
                                    <span className="arrow">
                                        <i className="arrow-icon" />
                                    </span>
                                </NavLink>
                            </li> */}
                {/* <li className="nav-item dropdown">
                  <NavLink className="dropdown-toggle" to="/teacher/profile">
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
                  <NavLink className="dropdown-toggle" to="/teacher/settings">
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

export default TeacherHeader;
