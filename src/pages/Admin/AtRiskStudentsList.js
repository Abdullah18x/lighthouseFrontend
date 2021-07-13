import React, { Component } from 'react';
import {Link } from "@reach/router";
const ls = require('local-storage')
const auth = require('../../axios/auth')
const admin = require('../../axios/admin')

class AtRiskStudents extends Component{
    state={
        adminId: ls.get('adminId'),
        userType: ls.get('userType'),
        token: ls.get('token'),
        atRiskStudents:[],
        loggedIn: true
      }

    verification = async () => {
        let verifyToken = await auth.verifyToken(this.state.adminId,this.state.userType,this.state.token)
        if(verifyToken.length === 0 ){
          this.setState({
            loggedIn:false
          })
          return
        }else{
          if(verifyToken.expired === 1){
            this.setState({
              loggedIn:false
            })
          }
          return
        }
      }

      setAtRiskStudents = async () =>{
        try {
          let atRiskStudents = await admin.getAtRiskStudents(this.state.token)
          this.setState({
            atRiskStudents:atRiskStudents
          })
        } catch (error) {
          
        }
      }

      componentDidMount(){
        if(this.state.adminId === null || this.state.adminId === undefined || this.state.userType === null || this.state.userType === undefined || this.state.token === null || this.state.token === undefined){
          this.setState({
            loggedIn:false
          })
          window.location.href='/error'
        }else{
          this.verification()
        }
        if(this.state.loggedIn){
          this.setAtRiskStudents()
      }
        
      }

      isLoggedIn = () => {
        if(this.state.loggedIn){
          return(
            <div>
          <div className="main-content">
    <div className="page-header">
      <div className="header-sub-title">
        <nav className="breadcrumb breadcrumb-dash">
          <a href="#" className="breadcrumb-item"><i className="anticon anticon-home m-r-5" />Home</a>
          <a className="breadcrumb-item" href="#">Students</a>
          <span className="breadcrumb-item active">At Risk Students</span>
        </nav>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <h4>At Risk Students</h4>
        <div className="m-t-25">
          <table id="data-table" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Email</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
            {
              this.state.atRiskStudents.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.studentId}</td>
                    <td>{data.name}</td>
                    <td>{data.rollNo}</td>
                    <td>{data.email}</td>
                    <td>{data.section}</td>
                    <td>{data.subject}</td>
                    <td>
                      <div className="dropdown dropdown-animated scale-left">
                          <a className="text-gray font-size-18" href="javascript:void(0);" data-toggle="dropdown">
                          <i className="anticon anticon-ellipsis" />
                          </a>
                          <div className="dropdown-menu">
                          <Link 
                              className="dropdown-item"
                              to='/admin/lecturerStudents'
                              state={{
                                  
                              }}
                              >
                              <i className="anticon anticon-eye" />
                              <span className="m-l-10">View Profile</span>
                          </Link>
                          
                          </div>
                      </div>
                      </td>
                  </tr>
                )
              })
            }
              
            </tbody>
            <tfoot>
              <tr>
              <th>ID</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Email</th>
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
      <p className="m-b-0">Copyright © 2020 COMSATS University. All rights reserved.</p>
      <span>
      </span>
    </div>
  </footer>
  {this.props.children}
        </div>
          )
        }else{
          window.location.href='/error'
        }
    
      }

      render() {
        return (
          <div className="page-container">
            {this.isLoggedIn()}
          </div>
      
      )
      }
}

export default AtRiskStudents