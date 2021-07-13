import React, { Component } from "react";
import TeacherList from "../../components/TeacherList";
import { Link, Redirect } from "@reach/router";
var ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class ViewDataSets extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    dataSets: [],
    loggedIn: true,
  };

  viewDatSets = async () => {
    let returnedDataSets = await admin.getDataSets(this.state.token);
    console.log(returnedDataSets);
    this.setState({
      dataSets: returnedDataSets,
    });
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

  deleteDatSet = async (datasetId) => {
    try {
      await admin.removeDataSet(datasetId, this.state.token);
      this.viewDatSets();
    } catch (error) {}
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
      this.viewDatSets();
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
                    Teachers
                  </a>
                  <span className="breadcrumb-item active">
                    View All Teachers
                  </span>
                </nav>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4>View All DataSets</h4>
                <div className="m-t-25">
                  <table id="data-table" className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Total Marks</th>
                        <th>Time Needed to solve</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.dataSets.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.datasetId}</td>
                            <td>{data.title}</td>
                            <td>{data.subject}</td>
                            <td>{data.totalMarks}</td>
                            <td>{data.timeNeeded} minutes</td>
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
                                    to="/admin/dataSet"
                                    state={{
                                      datasetId: data.datasetId,
                                    }}
                                  >
                                    <i className="anticon anticon-eye" />
                                    <span className="m-l-10">View</span>
                                  </Link>
                                  <button
                                    onClick={() => {
                                      this.deleteDatSet(data.datasetId);
                                    }}
                                    className="dropdown-item"
                                    type="button"
                                  >
                                    <i className="anticon anticon-delete" />
                                    <span className="m-l-10">Delete</span>
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
                        <th>Section</th>
                        <th>Subject</th>
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

export default ViewDataSets;
