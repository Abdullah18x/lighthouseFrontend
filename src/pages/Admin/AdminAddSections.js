import React, { Component} from 'react';
import {Link } from "@reach/router";
var ls = require('local-storage');
const auth = require('../../axios/auth')
const admin = require('../../axios/admin')

class EditSection extends Component{
    state={
        adminId: ls.get('adminId'),
        userType: ls.get('userType'),
        token: ls.get('token'),
        section:'',
        sectionSeason:'FA',
        sectionNumber:0,
        sectionDep:'',
        sectionAlphabet:'',
        loggedIn: true
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

      changeSeason = (event) => {
        this.setState({
          sectionSeason:event.target.value
        })
      }

      changeNum = (event) => {
        let num = event.target.value
        if(Number.isInteger(parseInt(num))){
          this.setState({
            sectionNumber:num
          })
        }
        
      }

      changeDep = (event) => {
        this.setState({
          sectionDep:event.target.value.toUpperCase()
        })
      }

      changeAlphabet = (event) => {
        this.setState({
          sectionAlphabet:event.target.value.toUpperCase()
        })
      }

      addSection = async () => {
        try {
          let newSection = this.state.sectionSeason.concat(this.state.sectionNumber.toString().concat('-'.concat(this.state.sectionDep.concat('-'.concat(this.state.sectionAlphabet)))))
          await admin.addSection(newSection,this.state.token)
          alert('Inserted')
          console.log(newSection)
          this.setState({
            section:newSection
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
                        <a className="breadcrumb-item" href="#">Sections</a>
                        <span className="breadcrumb-item active">Edit Section</span>
                        </nav>
                    </div>
                    </div>
                    <h4>Adding Section</h4>
                    <div className="form-group" style={{width:'205px',float:'left'}}>
                      <select id="inputState" className="form-control" onChange={this.changeSeason}>
                          <option value="FA" selected>FA</option>
                          <option value="SP">SP</option>
                      </select>
                    </div>
                    <input style={{width:'205px',float:'left'}} type="number" className="form-control" id="sectionNumber" value={this.state.sectionNumber} min='0' max='99' onChange={this.changeNum}/>
                    <input style={{width:'205px',float:'left'}} type="text" className="form-control" id="sectionDep" value={this.state.sectionDep} onChange={this.changeDep}/>
                    <input style={{width:'205px',float:'left', marginRight:'20px'}} type="text" className="form-control" id="sectionAlphabet" value={this.state.sectionAlphabet} onChange={this.changeAlphabet}/>
                    <button type="button" class="btn btn-primary" onClick={this.addSection}>Add</button>
                </div>
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

export default EditSection