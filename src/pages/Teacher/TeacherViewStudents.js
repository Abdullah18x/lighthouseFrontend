import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class TeacherViewStudents extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    lecturerStudents: [],
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

  getTeacherSudents = async () => {
    try {
      let studentsList = await lecturer.getStudents(
        this.state.lecturerId,
        this.state.token
      );
      console.log(studentsList);
      this.setState({
        lecturerStudents: studentsList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // removeFromSection = async (studentId) => {
  //   try {
  //     let toRemove = await lecturer.removeStudentFromSection(studentId, this.state.token)
  //     this.getTeacherSudents()
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

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
      this.getTeacherSudents();
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
                    View All Students
                  </span>
                </nav>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4>View All Students</h4>
                  <div className="m-t-25">
                    <table id="data-table" className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Registration Number</th>
                          <th>Email</th>
                          <th>Subject</th>
                          <th>Section</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.lecturerStudents.map((data, index) => {
                          let AtRisk = "Not At Risk";
                          if (data.atRisk === 1) {
                            AtRisk = " At Risk";
                          }
                          return (
                            <tr key={index}>
                              <td>{data.studentId}</td>
                              <td>{data.name}</td>
                              <td>{data.rollNo}</td>
                              <td>{data.email}</td>
                              <td>{data.subject}</td>
                              <td>{data.section}</td>
                              <td>{AtRisk}</td>
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
                                      to="/teacher/studentProfile"
                                      state={{
                                        studentId: data.studentId,
                                      }}
                                    >
                                      <i className="anticon anticon-eye" />
                                      <span className="m-l-10">
                                        View Profile
                                      </span>
                                    </Link>
                                    {/* <button onClick={()=>{this.removeFromSection(data.studentId)}} className="dropdown-item" type="button">
                                                <i className="anticon anticon-delete" />
                                                <span className="m-l-10">Remove from Section</span>
                                              </button> */}
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
                          <th>Name</th>
                          <th>Registration Number</th>
                          <th>Email</th>
                          <th>Subject</th>
                          <th>Section</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.props.children}
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

export default TeacherViewStudents;
