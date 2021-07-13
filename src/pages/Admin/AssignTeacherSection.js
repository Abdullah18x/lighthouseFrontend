import React, { Component} from 'react';
import TeacherList from '../../components/TeacherList'
import {Link, Redirect} from '@reach/router'
var ls = require('local-storage');
const auth = require('../../axios/auth')
const admin = require('../../axios/admin')

class AssignTeacherSection extends Component{
  state={
    adminId: ls.get('adminId'),
    userType: ls.get('userType'),
    token: ls.get('token'),
    name:'',
    lecturerId:0,
    sections:[],
    subjects:[],
    subjectId:0,
    loggedIn: true
  }

  getTeacher = async () => {
      let returnedTeacher = await admin.getLecturer(this.props.location.state.teacherId, this.state.token)
      console.log(returnedTeacher)
      this.setState({
          name:returnedTeacher.userName,
          lecturerId:returnedTeacher.lecturerId
      })
  }

  getSubjects = async () => {
    let returnedSubjects = await admin.getSubjects(this.state.token)
    console.log(returnedSubjects);
    this.setState({
        subjects:returnedSubjects
    })
}
changeSubject = (e) => {
    let subjectId = e.target.value
    this.setState({
        subjectId: subjectId
    })
}

  getSections = async () => {
      let returnedSections = await admin.getSections(this.state.token)
      this.setState({
          sections:returnedSections
      })
  }

  assignLecturer = async(id) => {
      if (this.state.subjectId > 0) {
        let sectionId = id
        let checkAssigned = await admin.getLecturerAssignedSection(sectionId, this.state.subjectId, this.state.token)
        if (checkAssigned.length === 0) {
            let assignLecturer = await admin.assignLecturer(this.state.lecturerId,this.state.subjectId, sectionId,  1 , this.state.token)
            await admin.updateLecturerStatus(this.state.lecturerId, 1, this.state.token)
            alert('Assigned')
        }
        else{
            alert(`Already Lecturer Assigned to Section for the Selected Subject`)
        }
        console.log(checkAssigned)
      }else{
          alert('please select a subject')
      }
    
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
        this.getTeacher()
        this.getSections()
        this.getSubjects()
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
          <h4>Assign {this.state.name}</h4><br />
          <h5 className="m-t-25">Select Subject</h5>
          <div className="form-group col-md-3" style={{padding:"0px"}}>
            <select id="inputState" className="form-control m-t-25" onChange={(e) => {this.changeSubject(e)}}>
                <option value={0} selected>Select</option>
                {
                    this.state.subjects.map((data,fileds) => {
                        return(
                            <option value={data.subjectId}>{data.subject}</option>
                        )
                    })
                }
            </select>
        </div>
          <div className="m-t-25">
            <table id="data-table" className="table" >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Section</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              <tbody>
                {
                    this.state.sections.map((data, fields) => {
                        return(
                            <tr>
                                <td>{data.sectionId}</td>
                                <td>{data.section}</td>
                                <td>
                                    <div className="dropdown dropdown-animated scale-left">
                                    <a className="text-gray font-size-18" href="javascript:void(0);" data-toggle="dropdown">
                                        <i className="anticon anticon-ellipsis" />
                                    </a>
                                    <div className="dropdown-menu">
                                        
                                        <button id={data.sectionId} onClick={() =>{this.assignLecturer(data.sectionId)} } className="dropdown-item" type="button">
                                        <i className="anticon anticon-delete" />
                                        <span className="m-l-10">Assign</span>
                                        </button>
                                    </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                  
                }
                
              </tbody><tfoot>
                <tr>
                    <th>ID</th>
                  <th>Section</th>
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

export default AssignTeacherSection

