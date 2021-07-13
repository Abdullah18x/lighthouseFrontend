import React, { Component } from "react";
import { Link } from "@reach/router";
var ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class ViewSectionDetails extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    section: "",
    assignedLecturers: [],
    sectionStudents: [],
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

  setSection = async () => {
    try {
      let sectionId = this.props.location.state.sectionId;
      let section = await admin.getSection(sectionId, this.state.token);
      console.log(section);
      let returnedSection = await admin.getAssignedLecturers(
        sectionId,
        this.state.token
      );
      this.setState({
        section: section[0].section,
        assignedLecturers: returnedSection,
      });
      console.log(returnedSection);
    } catch (error) {
      //window.location.href='/error'
      console.log(error);
    }
  };

  unAssignTeacher = async (lecturerId, assignId) => {
    try {
      let unassignedStatus = await admin.unAssignTeacher(
        lecturerId,
        assignId,
        this.state.token
      );
      // let returnedSection = await admin.getAssignedSections(
      //   this.props.location.state.teacherId,
      //   this.state.token
      // );
      // this.setState({
      //   assignedSections: returnedSection,
      // });
      this.setSection()
    } catch (error) {}
  };

  // setStudents = async () => {
  //   try {
  //     let sectionId = this.props.location.state.sectionId;
  //     let sectionStudents = await admin.getSectionStudents(
  //       sectionId,
  //       this.state.token
  //     );
  //     console.log(sectionStudents);
  //     this.setState({
  //       sectionStudents: sectionStudents,
  //     });
  //   } catch (error) {
  //     //window.location.href='/error'
  //     console.log(error);
  //   }
  // };

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
      this.setSection();
      // this.setStudents();
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
            <h3 style={{ textAlign: "center" }}>
              Section: {this.state.section}
            </h3>
            <div className="card">
              <div className="card-body">
                <h4>Assigned Teachers</h4>
                <div className="m-t-25">
                  <table id="data-table" className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Students</th>
                        <th>At Risk</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.assignedLecturers.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.lecturerId}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.subject}</td>
                            <td>{data.totalStudents}</td>
                            <td>{data.totalAtRisk}</td>
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
                                    to="/admin/lecturerStudents"
                                    state={{
                                      sectionId:
                                        this.props.location.state.sectionId,
                                      lecturerId: data.lecturerId,
                                      assignId: data.assignId,
                                    }}
                                  >
                                    <i className="anticon anticon-eye" />
                                    <span className="m-l-10">
                                      View Students
                                    </span>
                                  </Link>
                                  {/* <button className="dropdown-item" type="button">
                                        <i className="anticon anticon-eye" />
                                        <span className="m-l-10">View Students</span>
                                    </button> */}
                                  <button
                                    onClick={() => {
                                      this.unAssignTeacher(
                                        data.lecturerId,
                                        data.assignId
                                      );
                                    }}
                                    className="dropdown-item"
                                    type="button"
                                  >
                                    <i className="anticon anticon-delete" />
                                    <span className="m-l-10">Un-Assign</span>
                                  </button>
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
                        <th>Subject</th>
                        <th>Students</th>
                        <th>At Risk</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* <div className="card">
              <div className="card-body">
                <h4>Section Students</h4>
                <div className="m-t-25">
                  <table id="data-table" className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.sectionStudents.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.studentId}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.rollNo}</td>
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
                                        to='/admin/sectionDetails'
                                        state={{
                                            sectionId:props.sectionId,
                                            section:props.section
                                        }}
                                        >
                                        <i className="anticon anticon-eye" />
                                        <span className="m-l-10">View</span>
                                    </Link>
                                  <button
                                    className="dropdown-item"
                                    type="button"
                                  >
                                    <i className="anticon anticon-eye" />
                                    <span className="m-l-10">View</span>
                                  </button>
                                  <button
                                    className="dropdown-item"
                                    type="button"
                                  >
                                    <i className="anticon anticon-download" />
                                    <span className="m-l-10">Edit</span>
                                  </button>
                                  <button
                                    className="dropdown-item"
                                    type="button"
                                  >
                                    <i className="anticon anticon-delete" />
                                    <span className="m-l-10">Remove</span>
                                  </button>
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
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div> */}
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

export default ViewSectionDetails;
