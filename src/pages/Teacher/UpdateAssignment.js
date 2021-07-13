import React, { Component} from 'react';
import { Link } from "@reach/router";
var FormData = require('form-data');
const ls = require('local-storage')
const auth = require('../../axios/auth')
const lecturer = require('../../axios/lecturer')


    class UpdateAssignment extends Component{
      state={
        lecturerId: ls.get('teacherId'),
        userType: ls.get('userType'),
        token: ls.get('token'),
        title:'',
        totalMarks:0,
        assignDate:'',
        assignTime:'',
        dueDate:'',
        dueTime:'',
        section:0,
        subject:0,
        resourceMaterial:'',
        fileName:'Choose File',
        tempFileName:'',
        details:'',
        resourceLinks:'',
        solution:'',
        sectionList:[],
        subjectList:[],
        loggedIn: true
      }
    
      verification = async () => {
        let verifyToken = await auth.verifyToken(this.state.lecturerId,this.state.userType,this.state.token)
        if(verifyToken.length === 0 ){
          this.setState({
            loggedIn:false
          })
        }else{
          if(verifyToken.expired === 1){
            this.setState({
              loggedIn:false
            })
          }
        }
      }

      setStatus = async () => {
        try {
          let status = await lecturer.getStatus(this.state.lecturerId, this.state.token)
          if(status[0].status === 1){
            document.getElementById('assignRightNow').removeAttribute('disabled')
          }
        } catch (error) {
          console.log(error)
        }
      }

      setitle(e){
        this.setState({
          title: e.target.value
        })
      }

      setTotalMarks = (event) => {
        let num = event.target.value
        if(Number.isInteger(parseInt(num))){
          this.setState({
            totalMarks:num
          })
        }
        
      }

      setDueDate(e){
        this.setState({
          dueDate: e.target.value
        })
      }
      setDueTime(e){
        this.setState({
          dueTime: e.target.value
        })
      }
      setSection = async(e)=>{
        if(parseInt(e.target.value)){
          await this.getSubjects(e.target.value)
          document.getElementById('subjectList').removeAttribute('disabled')
          this.setState({
            section: e.target.value
          })
        }else{
          document.getElementById('subjectList').setAttribute('disabled','true')
          this.setState({
            section: ''
          })
        }
        
      }
      getSubjects = async (sectionId) =>{
          try {
            let subjectList = await lecturer.getSectionSubejct(this.state.lecturerId, sectionId, this.state.token)
            this.setState({
              subjectList: subjectList
            })
            return
          } catch (error) {
            console.log(error)
          }
      }
      setSubject(e){
        this.setState({
          subject: e.target.value
        })
      }
      setResourceMaterial = async(e) =>{
        try {
          let fileName = await e.target.files[0].name
          this.setState({
            resourceMaterial:e.target.files[0],
            fileName:fileName
          })
        } catch (error) {
          console.log(error)
        }

        
      }
      setDetails(e){
        this.setState({
          details: e.target.value
        })
      }
      setResourceLinks(e){
        this.setState({
          resourceLinks: e.target.value
        })
      }
      setSolution(e){
        this.setState({
          solution: e.target.value
        })
      }

      getSections = async () =>{
        try {
          let sectionList = await lecturer.getLecturerSectionList(this.state.lecturerId, this.state.token)
          this.setState({
            sectionList:sectionList
          })
        } catch (error) {
          console.log(error)
        }
      }

    //   assignRightNow(e){
    //     if(e.target.checked){
    //       document.getElementById('assignNowRow').style.removeProperty('display')
    //       document.getElementById('assignAssignment').style.removeProperty('display')
    //       document.getElementById('saveAssignment').style.display = 'none'
    //     }else{
    //       document.getElementById('assignNowRow').style.display = 'none'
    //       document.getElementById('assignAssignment').style.display = 'none'
    //       document.getElementById('saveAssignment').style.removeProperty('display')
    //     }
    //   }

      getAssignment = async () => {
        try {
            let assignmentId = this.props.location.state.assignmentId
            let returnedAssignment = await lecturer.getAssignment(assignmentId, this.state.token)
            
            let links = returnedAssignment[0].resourceLinks.replace(/[\r\n]+/g," ")
            // let links = removedNewLines.split(' ')
            
            this.setState({
                title:returnedAssignment[0].title,
                details:returnedAssignment[0].details,
                resourceLinks:links,
                fileName:returnedAssignment[0].resourceMaterial,
                tempFileName:returnedAssignment[0].resourceMaterial,
                totalMarks:returnedAssignment[0].totalMarks,
                solution:returnedAssignment[0].solution
            })
        } catch (error) {
            
        }
    }

    //   assignAssignment = async () => {
    //     try {
    //       if(this.state.title==='' || this.state.dueDate==='' || this.state.dueTime==='' || this.state.section===0 || this.state.subject===0 || this.state.resourceMaterial==='' || this.state.details==='' || this.state.resourceLinks==='' || this.state.solution===''){
    //         alert('please fill out the entire form')
    //         return
    //       }
          
    //       await this.saveAssignment()
    //       let dueDate = this.state.dueDate.concat(' '.concat(this.state.dueTime))
    //       let returnedAssignmentId = await lecturer.getLatestAssignmentId(this.state.lecturerId, this.state.token)
    //       let assignmentId = returnedAssignmentId[0].assignmentId
    //       let assignAssignment = await lecturer.assignAssignment(assignmentId,this.state.section,this.state.subject,dueDate,this.state.token)
    //       let changStatus = await lecturer.changeAssignmentStatus(assignmentId,1,this.state.token)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

      updateAssignment = async () => {
        try {
          
          if(this.state.title==='' ){
            alert('please fill out the entire form')
            return
          }
          if (!this.state.tempFileName.localeCompare(this.state.fileName)) {
              let data = {
                assignmentId:this.props.location.state.assignmentId,
                lecturerId:this.state.lecturerId,
                title:this.state.title,
                totalMarks:this.state.totalMarks,
                details:this.state.details,
                resourceLinks:this.state.resourceLinks,
                solution:this.state.solution


              }
            let uploaded = await lecturer.updateAssignmentWOF(data,this.state.token)
          }else{
              console.log('here')
            var data = new FormData()
            data.append('assignmentId',this.props.location.state.assignmentId)
            data.append('lecturerId',this.state.lecturerId)
            data.append('title', this.state.title)
            data.append('totalMarks', this.state.totalMarks)
            data.append('resourceMaterial',this.state.resourceMaterial)
            data.append('details',this.state.details)
            data.append('resourceLinks',this.state.resourceLinks)
            data.append('solution',this.state.solution)
            let uploaded = await lecturer.updateAssignmentWF(data,this.state.token)
          }

          
        //   let uploaded = await lecturer.saveAssignment(data,this.state.token)
        } catch (error) {
          console.log(error)
        }
      }
    
      componentDidMount(){
        if(this.state.lecturerId === null || this.state.lecturerId === undefined || this.state.userType === null || this.state.userType === undefined || this.state.token === null || this.state.token === undefined){
          this.setState({
            loggedIn:false
          })
          window.location.href='/error'
        }else{
          this.verification()
        }
        if(this.state.loggedIn){
            this.getAssignment()
        }
        
      }
    
      isLoggedIn = () => {
        
        if(this.state.loggedIn){
          return (
            <div>
                    <div className="main-content">
                        <div className="page-header">
                        <div className="header-sub-title">
                            <nav className="breadcrumb breadcrumb-dash">
                            <a href="#" className="breadcrumb-item"><i className="anticon anticon-home m-r-5" />Home</a>
                            <a className="breadcrumb-item" href="#">Sections</a>
                            <span className="breadcrumb-item active">View All Sections</span>
                            </nav>
                        </div>
                        <div className="card">
                          <div className="card-body">
                            <h4>Update Assignment: {this.state.title}</h4>
                            <div className="m-t-25">
                              <form>
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label htmlFor="assignmentTitle">Assignment Title</label>
                                    <input type="text" className="form-control" id="assignmentTitle" placeholder="Title" onChange={(e)=>{this.setitle(e)}} value={this.state.title}/>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label htmlFor="totalMarks">Total Marks</label>
                                    <input type="number" className="form-control" id="totalMarks" placeholder="Marks" onChange={(e)=>{this.setTotalMarks(e)}} value={this.state.totalMarks}/>
                                  </div>
                                </div>
                                {/* <div className="form-row">
                                  <div className="checkbox m-b-20">
                                    <input id="assignRightNow" type="checkbox" onChange={(e)=>{this.assignRightNow(e)}} />
                                    <label htmlFor="assignRightNow">Assign Right Now</label>
                                  </div>
                                </div>
                                
                                <div className="form-row" id="assignNowRow" style={{display:'none'}}>
                                  <div className="form-group col-md-4">
                                    <label>Due Date</label>
                                    <input type="date" id="dueDate" name="dueDate" onChange={(e)=>{this.setDueDate(e)}}  />
                                    <input type="time" id="dueTime" name="dueTime" onChange={(e)=>{this.setDueTime(e)}}  />
                                  </div>
                                  <div class="form-group col-md-3">
                                    <label >Section</label>
                                    <select id="sectionList" class="form-control" onChange={(e)=>{this.setSection(e)}} >
                                      <option value={0} selected>Select An Option</option>
                                      {
                                        this.state.sectionList.map((data, index) => {
                                          return(
                                            <option key={data.sectionId} value={data.sectionId}>{data.section}</option>
                                          )})}
                                      </select>
                                  </div>
                                  <div class="form-group col-md-3">
                                    <label >Subject</label>
                                    <select id="subjectList" class="form-control" onChange={(e)=>{this.setSubject(e)}} disabled>
                                    <option value={0} selected>Select An Option</option>
                                      {
                                        this.state.subjectList.map((data, index) => {
                                          return(
                                            <option key={data.subjectId} value={data.subjectId}>{data.subject}</option>
                                          )

                                        })
                                      }
                                      </select>
                                  </div>
                                  
                                </div> */}
                                <div className="form-group">
                                <label>Resource Material</label>
                                  <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile" onChange={this.setResourceMaterial} />
                                    <label className="custom-file-label" htmlFor="customFile">{this.state.fileName}</label>
                                  </div>
                                </div>
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Details</label>
                                    <textarea className="form-control" id="input5" placeholder="Details" onChange={(e)=>{this.setDetails(e)}} value={this.state.details}></textarea>
                                  </div>
                                </div>
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Resource Links ~ Please give space bewteen links or enter each one in a new line</label>
                                    <textarea className="form-control" id="input5" placeholder="Helping Links" onChange={(e)=>{this.setResourceLinks(e)}} value={this.state.resourceLinks}></textarea>
                                  </div>
                                </div>
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label htmlFor="solution">Solution</label>
                                    <textarea className="form-control" id="solution" placeholder="Result" onChange={(e)=>{this.setSolution(e)}} value={this.state.solution}></textarea>
                                  </div>
                                </div>
                                {/* <div className="form-group">
                                  <div className="form-group d-flex align-items-center">
                                    <div className="switch m-r-10">
                                      <input type="checkbox" id="switch-1" defaultChecked />
                                      <label htmlFor="switch-1" />
                                    </div>
                                    <label>Checked</label>
                                  </div>
                                </div> */}
                                <div className="form-row">
                                  <button id="assignAssignment" type="button" className="btn btn-primary" onClick={this.assignAssignment} style={{marginRight:'10px',display:'none'}} >Assign</button>
                                  <button id="saveAssignment" type="button" className="btn btn-primary" onClick={this.updateAssignment} >Update</button>
                                </div>
                               
                              </form>
                            </div>
                          </div>
    </div>
                        </div>
                    </div>
                   
                {this.props.children}
                </div>
          )
      }else{
        window.location.href='/error'
      }
    }
      
    
      render(){
        return(
          <div className="page-container">
            {this.isLoggedIn()}
    </div>
        )
      }
    }
    
    export default UpdateAssignment