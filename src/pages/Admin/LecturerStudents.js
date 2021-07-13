import React, { Component } from "react";
import { Link } from "@reach/router";
var ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class LecturerStudents extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    section: "",
    lecturerName: "",
    lecturerStudents: [],
    loggedIn: true,
  };

  verification = async () => {
    let verifyToken = await auth.verifyToken(
      this.state.adminId,
      this.state.userType,
      this.state.token
    );
    if (verifyToken.length === 0) {
      this.setState({
        loggedIn: false,
      });
    } else {
      if (verifyToken[0].expired === 1) {
        this.setState({
          loggedIn: false,
        });
      }
    }
  };

  setStudents = async () => {
    try {
      let sectionId = this.props.location.state.sectionId;
      let lecturerId = this.props.location.state.lecturerId;
      let assignId = this.props.location.state.assignId;
      let section = await admin.getSection(sectionId, this.state.token);
      let returnedStudents = await admin.getLecturerStudents(
        lecturerId,
        assignId,
        this.state.token
      );
      if (returnedStudents[0].studentId != null) {
        this.setState({
          section: section[0].section,
          lecturerStudents: returnedStudents,
        });
      }else{
        this.setState({
          section: section[0].section
        });
      }
      
      console.log(returnedStudents);
    } catch (error) {
      //   window.location.href='/error'
      console.log(error);
    }
  };

  componentDidMount() {
    if (
      this.state.adminId === null ||
      this.state.adminId === undefined ||
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
      this.setStudents();
    }
  }

  isLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <div className="main-content">
            <div className="page-header">
              <div className="header-sub-title">
                <nav className="breadcrumb breadcrumb-dash">
                  <a href="#" className="breadcrumb-item">
                    <i className="anticon anticon-home m-r-5" />
                    Home
                  </a>
                  <a className="breadcrumb-item" href="#">
                    Sections
                  </a>
                  <span className="breadcrumb-item active">
                    Section Details
                  </span>
                </nav>
              </div>
            </div>
            <h3
              style={{ textAlign: "left", paddingLeft: "6px" }}
              className="m-b-25"
            >
              Section: {this.state.section}
            </h3>
            <div className="card">
              <div className="card-body">
                <h4>Students</h4>
                <div className="m-t-25">
                  <table id="data-table" className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.lecturerStudents.map((data, index) => {
                        let atRisk = "Not At Risk";
                        if (data.atRisk === 1) {
                          atRisk = "At Risk";
                        }
                        return (
                          <tr key={index}>
                            <td>{data.studentId}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.rollNo}</td>
                            <td>{atRisk}</td>
                            <td>
                              <div className="dropdown dropdown-animated scale-left">
                                <a
                                  className="text-gray font-size-18"
                                  href="javascript:void(0);"
                                  data-toggle="dropdown"
                                >
                                  <i className="anticon anticon-ellipsis" />
                                </a>
                                <div className="dropdown-menu">
                                  <Link
                                    className="dropdown-item"
                                    to="/admin/studentProfile"
                                    state={{
                                      studentId:data.studentId,
                                      lecturerId:this.props.location.state.lecturerId
                                    }}
                                  >
                                    <i className="anticon anticon-eye" />
                                    <span className="m-l-10">View Profile</span>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
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
          {this.props.children}
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

export default LecturerStudents;
