import React, { Component} from 'react';
import TeacherList from '../../components/TeacherList'
import {Link, Redirect} from '@reach/router'
var ls = require('local-storage');
const auth = require('../../axios/auth')
const admin = require('../../axios/admin')

class Viewteacher extends Component{
  state={
    adminId: ls.get('adminId'),
    userType: ls.get('userType'),
    token: ls.get('token'),
    teachers:[],
    loggedIn: true
  }

  viewTeachers = async () => {
    let returnedteacher = await admin.getLecturerList(this.state.token)
    this.setState({
      teachers:returnedteacher
    })
  }

  verification = async () => {
    let verifyToken = await auth.verifyToken(this.state.adminId,this.state.userType,this.state.token)
    if(verifyToken.length === 0 ){
      this.setState({
        loggedIn:false
      })
    }else{
      if(verifyToken[0].expired === 1){
        this.setState({
          loggedIn:false
        })
      }
    }
  }
  
  deletelecturer = async (lecturerId) => {
    try {
      await admin.removeTeacher(lecturerId, this.state.token)
      this.viewTeachers()
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
      this.viewTeachers()
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
            <a className="breadcrumb-item" href="#">Teachers</a>
            <span className="breadcrumb-item active">View All Teachers</span>
          </nav>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4>View All Teachers</h4>
          <div className="m-t-25">
            <table id="data-table" className="table" >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              <tbody>
                {
                  this.state.teachers.map((data, index) => {
                    let status = 'Un Assigned'
                    if (data.status === 1) {
                      status = 'Assigned'
                    }
                    return (
                      <TeacherList 
                        key={index}
                        id={data.lecturerId}
                        name={data.name}
                        userName={data.userName}
                        email={data.email}
                        status={status}
                        deleteLecturer={() => {this.deletelecturer(data.lecturerId)}}

                      />
                    )
                  })
                }
                
              </tbody><tfoot>
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
        <p className="m-b-0">Copyright © 2020 COMSATS University. All rights reserved.</p>
        <span>
        </span>
      </div>
    </footer>
    {this.props.children}
        </div>
      )
    }
    else{
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

export default Viewteacher

