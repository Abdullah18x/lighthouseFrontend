import React, { Component } from "react";
import { Link } from "@reach/router";
var ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class ViewStudents extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    studentsList: [],
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
      let studentsList = await admin.getStudents(this.state.token);
      this.setState({
        studentsList: studentsList,
      });
    } catch (error) {
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
                    Students
                  </a>
                  <span className="breadcrumb-item active">
                    View All Students
                  </span>
                </nav>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4>View All Students</h4>
                <div className="m-t-25">
                  <table id="data-table" className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.studentsList.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.studentId}</td>
                            <td>{data.userName}</td>
                            <td>{data.name}</td>
                            <td>{data.rollNo}</td>
                            <td>{data.email}</td>

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
                                      studentId: data.studentId,
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
                        <th>User Name</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Email</th>

                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

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

export default ViewStudents;
