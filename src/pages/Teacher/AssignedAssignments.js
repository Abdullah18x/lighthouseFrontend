import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class TeacherAssignedAssignments extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    option:1,
    assignments: [],
    dataSets:[],
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

  setAssignments = async () => {
    try {
      let returnedAssignments = await lecturer.getAssignedAssignments(
        this.state.lecturerId,
        this.state.token
      );
      console.log(returnedAssignments);
      this.setState({
        assignments: returnedAssignments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeAssignments = async (e) => {
    if (e.target.value === "assignments") {
      this.setState({
        option: 1,
      });
      this.setAssignments();
    } else {
      this.setState({
        option: 0,
      });
      this.setDataSets();
    }
  };

  setDataSets = async () => {
    try {
      let returnedDatasets = await lecturer.getAssignedDataSets(
        this.state.lecturerId,
        this.state.token
      );
      console.log(returnedDatasets);
      this.setState({
        assignments: returnedDatasets,
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteAssigned = async (assignmentId, assignedId) => {
    try {
      console.log(assignedId);
      let deleteAssignment = await lecturer.deleteAssignedAssignment(
        assignmentId,
        assignedId,
        this.state.token
      );
      this.setAssignments();
    } catch (error) {
      console.log(error);
    }
  };

  deleteAssigned2 = async (datasetId, assignedSId) => {
    try {
      let deleteAssignment = await lecturer.deleteAssignedAssignment2(
        datasetId,
        assignedSId,
        this.state.token
      );
      this.setDataSets();
    } catch (error) {
      console.log(error);
    }
  };

  formatDate = (date) => {
    let format = date.replace("T", " ").replace(".000Z", "");
    return format;
  };

  renderAssignments() {
    return(
      <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Section</th>
          <th>Subject</th>
          <th>Assigned</th>
          <th>Due</th>
          <th>Total Marks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.assignments.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.assignmentId}</td>
              <td>{data.title}</td>
              <td>{data.section}</td>
              <td>{data.subject}</td>
              <td>{this.formatDate(data.assigned)}</td>
              <td>{this.formatDate(data.due)}</td>
              <td>{data.totalMarks}</td>
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
                      to="/teacher/viewAssignedAssignment"
                      state={{
                        assignedId: data.assignedId,
                        assignmentId: data.assignmentId,
                      }}
                    >
                      <i className="anticon anticon-eye" />
                      <span className="m-l-10">
                        View Assignment
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        this.editDueDate(data.assignmentId);
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      <i className="anticon anticon-delete" />
                      <span className="m-l-10">
                        Edit Due Date
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        this.deleteAssigned(
                          data.assignmentId,
                          data.assignedId
                        );
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      <i className="anticon anticon-delete" />
                      <span className="m-l-10">
                        Un-Assign
                      </span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
        
      </tbody>
    </table>
    )
  }

  renderDataSets() {
    return(
      <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Section</th>
          <th>Subject</th>
          <th>Assigned</th>
          <th>Due</th>
          <th>Total Marks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.assignments.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.datasetId}</td>
              <td>{data.title}</td>
              <td>{data.section}</td>
              <td>{data.subject}</td>
              <td>{this.formatDate(data.assigned)}</td>
              <td>{this.formatDate(data.due)}</td>
              <td>{data.totalMarks}</td>
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
                      to="/teacher/viewAssignedDataSet"
                      state={{
                        assignedSId: data.assignedSId,
                        datasetId: data.datasetId,
                      }}
                    >
                      <i className="anticon anticon-eye" />
                      <span className="m-l-10">
                        View Assignment
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        this.editDueDate(data.assignmentId);
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      <i className="anticon anticon-delete" />
                      <span className="m-l-10">
                        Edit Due Date
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        this.deleteAssigned2(
                          data.datasetId,
                          data.assignedSId
                        );
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      <i className="anticon anticon-delete" />
                      <span className="m-l-10">
                        Un-Assign
                      </span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
        
      </tbody>
    </table>
    )
  }

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
      this.setAssignments();
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
                    View All Assigned Assignments
                  </span>
                </nav>
              </div>
              <div className="container-fluid">
                <div className="card" id="list-view">
                  <div className="card-body">
                  <div className="row">
                      <div className="col-md-8">
                        <h4>View All Assigned Assignments</h4>
                      </div>
                      <div className="col-md-4">
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => {
                            this.changeAssignments(e);
                          }}
                        >
                          <option value="assignments" selected>
                            Assignments
                          </option>
                          <option value="dataSets">Data Sets</option>
                        </select>
                      </div>
                    </div>
                    <div className="table-responsive">
                    {this.state.option
                      ? this.renderAssignments()
                      : this.renderDataSets()}
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

export default TeacherAssignedAssignments;
