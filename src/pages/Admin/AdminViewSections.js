import React, { Component } from "react";
import SectionList from "../../components/SectionList";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class AdminViewSections extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    sections: [],
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

  getSectionList = async () => {
    try {
      let retrivedList = await admin.getSections(this.state.token);
      this.setState({
        sections: retrivedList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // removeSection = async (sectionId) => {
  //   try {
  //     await admin.removeSection(sectionId,this.state.token)
  //     this.getSectionList()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
      this.getSectionList();
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
                    View All Sections
                  </span>
                </nav>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4>View All Sections</h4>
                <div className="m-t-25">
                  <table id="data-table" className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Section</th>
                        <th>Assigned Teachers</th>
                        <th>Students</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.sections.map((data, index) => {
                        return (
                          <SectionList
                            key={index}
                            sectionId={data.sectionId}
                            section={data.section}
                            students={data.students}
                            lecturers={data.totalLecturers}
                            remove={() => {
                              this.removeSection(data.sectionId);
                            }}
                          />
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>Section</th>
                        <th>Students</th>
                        <th>Subjects</th>
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

export default AdminViewSections;
