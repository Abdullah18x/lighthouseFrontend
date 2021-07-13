import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class StudentCallibration extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    assignments: [],
    sections: [],
    students: [],
    subjectId: 0,
    sectionId: 0,
    assignId: 0,
    totalAssigned: 0,
    totalMarks: 0,
    totalTime: 0,
    atRiskStudents: [],
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

  getTeacherSections = async () => {
    let returnedTeacherSections = await lecturer.getLecturerSections(
      this.state.lecturerId,
      this.state.token
    );
    console.log(returnedTeacherSections);
    this.setState({
      sections: returnedTeacherSections,
    });
  };

  setSections = () => {
    if (this.state.sections.length >= 1) {
      return this.state.sections.map((data, fields) => {
        return (
          <option value={JSON.stringify(data)}>
            {data.section} ({data.subject}){" "}
          </option>
        );
      });
    } else {
      return <option value="0">Not Registered to any section</option>;
    }
  };

  selectClass = async (e) => {
    if (e.target.value != 0) {
      e = JSON.parse(e.target.value);
      let sectionStudents = await lecturer.getSectionStudents(
        e.assignId,
        this.state.token
      );
      console.log(sectionStudents);
      this.setState({
        assignId: e.assignId,
        sectionId: e.sectionId,
        subjectId: e.subjectId,
        students: sectionStudents,
      });
    } else {
      this.setState({
        assignId: 0,
        sectionId: 0,
        subjectId: 0,
        students: [],
      });
    }

    // this.getSectionStudents()
  };

  setSectionStudents = () => {
    if (this.state.assignId > 0 && this.state.students.length > 0) {
      return this.state.students.map((data, index) => {
        let atRisk = null;
        if (data.atRisk != null) {
          atRisk = "At Risk";
        } else {
          atRisk = "Not At Risk";
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
                    to="/teacher/studentProfile"
                    state={{
                      studentId: data.studentId,
                    }}
                  >
                    <i className="anticon anticon-eye" />
                    <span className="m-l-10">View Profile</span>
                  </Link>
                  {/* <button onClick={() => {this.delete(data.assignmentId)}} className="dropdown-item" type="button">
                            <i className="anticon anticon-delete" />
                            <span className="m-l-10">Callibrate</span>
                            </button> */}
                </div>
              </div>
            </td>
          </tr>
        );
      });
    } else {
      return <h2>No students avalaible</h2>;
    }
  };

  callibrateAllStudents = async () => {
    if (this.state.assignId > 0) {
      let getAssignedAssignmentsStats =
        await lecturer.getAssignedAssignmentsStats(
          this.state.lecturerId,
          this.state.sectionId,
          this.state.subjectId,
          this.state.token
        );

        let getAssignedDataSetssStats =
        await lecturer.getAssignedDataSetssStats(
          this.state.lecturerId,
          this.state.sectionId,
          this.state.subjectId,
          this.state.token
        );
      console.log(getAssignedAssignmentsStats);
      console.log(getAssignedDataSetssStats);
      this.setState({
        totalAssigned: getAssignedAssignmentsStats[0].totalAssigned+getAssignedDataSetssStats[0].totalAssigned,
        totalMarks: parseInt(getAssignedAssignmentsStats[0].totalMarks)+parseInt(getAssignedDataSetssStats[0].totalMarks),
        totalTime: parseInt(getAssignedAssignmentsStats[0].totalTime)+parseInt(getAssignedDataSetssStats[0].totalTime),
      });
      console.log(this.state.totalAssigned)
      if (this.state.totalAssigned >= 2) {
        this.setState({
          atRiskStudents: [],
        });
        let getStudentsStats = await lecturer.getStudentsStats(
          this.state.lecturerId,
          this.state.sectionId,
          this.state.subjectId,
          this.state.token
        );
        console.log(getStudentsStats);
        for (let i = 0; i < getStudentsStats.length; i++) {
          if (
            getStudentsStats[i].totalSubmissions === 0 ||
            (getStudentsStats[i].totalSubmissions / this.state.totalAssigned) *
              100 <
              60
          ) {
            this.state.atRiskStudents.push({
              studentId: getStudentsStats[i].studentId,
              assignId: this.state.assignId,
              atRisk: 1,
            });
          } else if (
            getStudentsStats[i].totalMarks === 0 ||
            (getStudentsStats[i].totalMarks / this.state.totalMarks) * 100 < 65
          ) {
            this.state.atRiskStudents.push({
              studentId: getStudentsStats[i].studentId,
              assignId: this.state.assignId,
              atRisk: 1,
            });
          } else if (
            (getStudentsStats[i].totalMarks / this.state.totalMarks) * 100 >
              65 &&
            (getStudentsStats[i].totalMarks / this.state.totalMarks) * 100 <
              85 &&
            getStudentsStats[i].totalTime >
              this.state.totalTime + (60 / 100) * this.state.totalTime
          ) {
            this.state.atRiskStudents.push({
              studentId: getStudentsStats[i].studentId,
              assignId: this.state.assignId,
              atRisk: 1,
            });
          } else if (getStudentsStats[i].timesLate > 0) {
            if (
              (getStudentsStats[i].totalMarks / this.state.totalMarks) * 100 >
                85 &&
              (getStudentsStats[i].timesLate /
                getStudentsStats[i].totalSubmissions) *
                100 >=
                85
            ) {
              this.state.atRiskStudents.push({
                studentId: getStudentsStats[i].studentId,
                assignId: this.state.assignId,
                atRisk: 1,
              });
            }
          }
        }
        console.log(JSON.stringify(this.state.atRiskStudents));
        let saveAtRiskStudents = await lecturer.saveAtRiskStudents(
          JSON.stringify(this.state.atRiskStudents),
          this.state.assignId,
          this.state.token
        );
        let sectionStudents = await lecturer.getSectionStudents(
          this.state.assignId,
          this.state.token
        );

        this.setState({
          assignId: this.state.assignId,
          sectionId: this.state.sectionId,
          subjectId: this.state.subjectId,
          students: sectionStudents,
        });
      } else {
        alert("Minium 3 Assignments Assigned required for callibration");
      }
    } else {
      alert("Please Select a Class");
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
      this.getTeacherSections();
      //this.getSectionStudents()
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
                    View All Assignments
                  </span>
                </nav>
              </div>
              <div className="container-fluid">
                <div className="card" id="list-view">
                  <div className="card-body">
                    <div className="form-group">
                      <h3 htmlFor="inputState">Select a class</h3>
                      <select
                        id="inputState"
                        className="form-control"
                        onChange={(e) => {
                          this.selectClass(e);
                        }}
                      >
                        <option value="0">Select An option </option>
                        {this.setSections()}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card" id="list-view">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-10">
                        <h4>Students List</h4>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group col-md-3">
                          <button
                            type="button"
                            onClick={this.callibrateAllStudents}
                            className="btn btn-primary "
                          >
                            Callibrate All
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roll No</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.setSectionStudents()}
                          {/* <tr>
                            <td>
                            <div className="media align-items-center">
                                <div className="m-l-10">
                                <h5 className="m-b-0">OOP - Assignment 1</h5>
                                </div>
                            </div>
                            </td>
                            <td>
                            <span>10/98 Students</span>
                            </td>
                            <td>
                            <span class="badge badge-pill badge-green font-size-12">Assigned</span>
                            </td>
                            <td>
                            <span>SE-7A</span>
                            </td>
                            <td>
                            <span>16 Dec 2020</span>
                            </td>
                            <td>
                            <div className="d-flex align-items-center">
                                <div className="progress progress-sm w-100 m-b-0">
                                <div className="progress-bar bg-primary" role="progressbar" style={{width: '20%'}} />
                                </div>
                                <div className="m-l-10">
                                <i className="anticon anticon-check-o text-primary" />
                                </div>
                            </div>
                            </td>
                            <td className="text-right">
                            <div className="dropdown dropdown-animated scale-left">
                                <a className="text-gray font-size-18" href="javascript:void(0);" data-toggle="dropdown">
                                <i className="anticon anticon-ellipsis" />
                                </a>
                                <div className="dropdown-menu">
                                <button className="dropdown-item" type="button">
                                    <i className="anticon anticon-eye" />
                                    <span className="m-l-10">View</span>
                                </button>
                                <button className="dropdown-item" type="button">
                                    <i className="anticon anticon-edit" />
                                    <span className="m-l-10">Edit</span>
                                </button>
                                <button className="dropdown-item" type="button">
                                    <i className="anticon anticon-delete" />
                                    <span className="m-l-10">Delete</span>
                                </button>
                                </div>
                            </div>
                            </td>
                        </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
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

export default StudentCallibration;
