import axios from 'axios'

let url = 'http://localhost:3010'

let getStudent = async (studentId, token) =>{
    try {
        const response = await axios.post(`${url}/student/getStudent`,{
            studentId:studentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

let getAssignments = async (studentId, token) =>{
    try {
        const response = await axios.post(`${url}/assignment/getAllStudentAssignments`,{
            studentId:studentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getAssignments2 = async (studentId, token) =>{
    try {
        const response = await axios.post(`${url}/assignment/getAllMarkedAssignments`,{
            studentId:studentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getAssignment = async (assignmentId, token) =>{
    try {
        const response = await axios.post(`${url}/assignment/getAssignmentStd`,{
          assignmentId:assignmentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getStudentSubmissionS = async (assignedId,studentId, token) =>{
    try {
        const response = await axios.post(`${url}/assignment/getStudentSubmissionS`,{
          assignedId: assignedId,
          studentId: studentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getStudentSubmissionS2 = async (assignedSId,studentId, token) =>{
    try {
        const response = await axios.post(`${url}/dataSet/getStudentSubmissionS`,{
          assignedSId: assignedSId,
          studentId: studentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getDataSets = async (studentId, token) =>{
    try {
        const response = await axios.post(`${url}/dataSet/getDataSets3`,{
            studentId:studentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getDataSets2 = async (studentId, token) =>{
    try {
        const response = await axios.post(`${url}/dataSet/getMarkedDataSets`,{
            studentId:studentId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getDataSet = async (datasetId, token) =>{
    try {
        const response = await axios.post(`${url}/dataSet/getDataSet3`,{
          datasetId:datasetId
        },{
          headers:{
            Authorization: token
          }
        }
        );
        return response.data
      } catch (error) {
        console.log(error)
        return error
        
      }
  }

  let getfeedbacks = async (token) => {
    try {
      const response = await axios.post(
        `${url}/feedback/getFeedbacksS`,{},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  let getfeedback = async (fbId,token) => {
    try {
      const response = await axios.post(
        `${url}/feedback/getFeedbackSt`,{
          fbId:fbId
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  let giveFeedback = async (userId,title, userDetails, feedback,token) => {
    try {
      const response = await axios.post(
        `${url}/feedback/giveFeedbackS`,{
          userId:userId,
          userType:2,
          title:title,
          userDetails:userDetails,
          feedback:feedback
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  let comment = async (fbId, userDetails, comment,token) => {
    try {
      const response = await axios.post(
        `${url}/feedback/commentSt`,{
          fbId:fbId,
          userDetails:userDetails,
          comment:comment
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  let getComments = async (fbId,token) => {
    try {
      const response = await axios.post(
        `${url}/feedback/commentsS`,{
          fbId:fbId
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  let updateProfile = async (studentId,name, email, token) => {
    try {
      const response = await axios.patch(
        `${url}/student/updateProfile`,
        {
          studentId: studentId,
          name: name,
          email: email,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  let updatePassword = async (studentId,password, token) => {
    try {
      const response = await axios.patch(
        `${url}/student/updatePassword`,
        {
          studentId: studentId,
          password: password
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  export{
    getStudent,
    getAssignments,
    getAssignments2,
    getAssignment,
    getStudentSubmissionS,
    getDataSets,
    getStudentSubmissionS2,
    getDataSet,
    getDataSets2,
    getfeedbacks,
    getfeedback,
    giveFeedback,
    comment,
    getComments,
    updateProfile,
    updatePassword
  }