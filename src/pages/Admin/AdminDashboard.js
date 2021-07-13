import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class AdminDashboard extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    userName: "",
    email: "",
    sections: 0,
    dataSets: 0,
    totalStudents: 0,
    totalSections: 0,
    totalTeachers: 0,
    recentSections: [],
    lecturerAtRiskStudents: [],
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
      return;
    } else {
      if (verifyToken.expired === 1) {
        this.setState({
          loggedIn: false,
        });
      }
      return;
    }
  };
  setAdmin = async () => {
    let adminData = await admin.getUser(this.state.adminId, this.state.token);
    this.setState({
      userName: adminData.userName,
      email: adminData.email,
    });
  };
  setRecentSections = async () => {
    let returnedSections = await admin.recentSections(this.state.token);
    this.setState({
      recentSections: returnedSections,
    });
  };

  setLecturerAtRiskStudents = async () => {
    let returnedAtRiskList = await admin.lecturerAtRiskStudents(
      this.state.token
    );
    console.log(returnedAtRiskList);
    this.setState({
      lecturerAtRiskStudents: returnedAtRiskList,
    });
  };

  setStats = async () => {
    let stats = await admin.getStats(this.state.token);
    console.log(stats);
    this.setState({
      sections: stats.sections,
      dataSets: stats.dataSets,
      totalStudents: stats.students,
      totalSections: stats.sections,
      totalTeachers: stats.lecturers,
    });
  };

  goToSections = () => {
    window.location.href = "/admin/sections";
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
      this.setAdmin();
      this.setStats();
      this.setRecentSections();
      this.setLecturerAtRiskStudents();
    }
  }
  isLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <div className="main-content">
            <div className="page-header no-gutters">
              <div className="d-md-flex align-items-md-center justify-content-between">
                <div className="media m-v-10 align-items-center">
                  <div className="avatar avatar-image avatar-lg">
                    <img src="../assets/images/avatars/thumb.jpg" alt="" />
                  </div>
                  <div className="media-body m-l-15">
                    <h4 className="m-b-0">
                      Welcome back, {this.state.userName}!
                    </h4>
                  </div>
                </div>
                <div className="d-md-flex align-items-center d-none">
                  <div className="media align-items-center m-r-40 m-v-5">
                    <div className="font-size-27">
                      <i className="text-primary anticon anticon-profile" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">{this.state.sections}</h2>
                      <span className="text-gray">Sections</span>
                    </div>
                  </div>
                  <div className="media align-items-center m-r-40 m-v-5">
                    <div className="font-size-27">
                      <i className="text-primary anticon anticon-profile" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">{this.state.dataSets}</h2>
                      <span className="text-gray">Data Sets</span>
                    </div>
                  </div>
                  <div className="media align-items-center m-r-40 m-v-5">
                    <div className="font-size-27">
                      <i className="text-danger anticon anticon-team" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">
                        {this.state.totalStudents}
                      </h2>
                      <span className="text-gray">Total Students</span>
                    </div>
                  </div>
                  <div className="media align-items-center m-r-40 m-v-5">
                    <div className="font-size-27">
                      <i className="text-success anticon anticon-team" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">
                        {this.state.totalSections}
                      </h2>
                      <span className="text-gray">Total Sections</span>
                    </div>
                  </div>
                  <div className="media align-items-center m-v-5">
                    <div className="font-size-27">
                      <i className="text-success anticon anticon-team" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">
                        {this.state.totalTeachers}
                      </h2>
                      <span className="text-gray">Total Teachers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Recent Sections</h5>
                      <div>
                        {/* <button type='button' onClick={this.goToSections} className="btn btn-sm btn-default">View All</button> */}
                        <Link
                          className="btn btn-sm btn-default"
                          to="/admin/sections"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                    <div className="m-t-30">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Section</th>
                              <th>Assigned Teachers</th>
                              <th>Total Students</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.recentSections.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td>{data.sectionId}</td>
                                  <td>{data.section}</td>
                                  <td>{data.totalLecturers}</td>
                                  <td>{data.students}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Teachers | At Risk Students</h5>
                  <div>
                  <Link 
                          className="btn btn-sm btn-default"
                          to='/admin/teachersWithARS'
                        >
                          View All
                      </Link>
                  </div>
                </div>
                <div className="m-t-30">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Total Sections</th>
                          <th>At Risk Students</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.lecturerAtRiskStudents.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{data.id}</td>
                              <td>{data.name}</td>
                              <td>{data.totalSections}</td>
                              <td>{data.totalStudents}</td>
                            </tr>
                          )
                        })
                      }
                        
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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

export default AdminDashboard;
