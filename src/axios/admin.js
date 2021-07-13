import axios from "axios"

let url = "http://localhost:3010";
let getUser = async (userId, token) => {
  try {
    const response = await axios.post(
      `${url}/admin/fetchAdmin`,
      {
        adminId: userId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

let updateEmail = async (id, email, token) => {
  try {
    const response = await axios.patch(
      `${url}/admin/updateEmail`,
      {
        id: id,
        email: email,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

let updatePassword = async (id, password, token) => {
  try {
    const response = await axios.patch(
      `${url}/admin/updatePassword`,
      {
        id: id,
        password: password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getLecturerList = async (token) => {
  try {
    const response = await axios.post(
      `${url}/lecturer/fetchLecturers`,
      {},
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

let getLecturer = async (lecturerId, token) => {
  try {
    const response = await axios.post(
      `${url}/lecturer/adminFetchLecturer`,
      {
        lecturerId: lecturerId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getAssignedSections = async (lecturerId, token) => {
  try {
    const response = await axios.post(
      `${url}/lecturer/getAssignedSections`,
      {
        lecturerId: lecturerId,
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

let getLecturerAssignedSection = async (sectionId, subjectId, token) => {
  try {
    const response = await axios.post(
      `${url}/lecturer/getLecturerAssignedSection`,
      {
        subjectId: subjectId,
        sectionId: sectionId,
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

let getSections = async (token) => {
  try {
    const response = await axios.post(
      `${url}/sections/getSections`,
      {},
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

let getSection = async (sectionsId, token) => {
  try {
    const response = await axios.post(
      `${url}/sections/getSection`,
      {
        sectionId: sectionsId,
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

let getSubjects = async (token) => {
  try {
    const response = await axios.post(
      `${url}/subjects/getSubjects`,
      {},
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

let saveDataSet = async (data, token) => {
  try {
    const response = await axios.post(`${url}/dataSet/createDataSet`, data, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

let insertSubject = async (subject, token) => {
  try {
    const response = await axios.post(
      `${url}/subjects/insertSubject`,
      {
        subject: subject,
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

let updateSubject = async (subjectId, subject, token) => {
  try {
    const response = await axios.patch(
      `${url}/subjects/updateSubject`,
      {
        subject: subject,
        subjectId: subjectId,
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

let addLecturer = async (userName, password, email, name, status, token) => {
  try {
    await axios.post(
      `${url}/lecturer/addL`,
      {
        userName: userName,
        password: password,
        email: email,
        name: name,
        status: status,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};
let addStudent = async (userName, password, email, name, rollNo, token) => {
  try {
    await axios.post(
      `${url}/student/addS`,
      {
        userName: userName,
        password: password,
        email: email,
        name: name,
        rollNo: rollNo,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getStudent = async (studentId, token) => {
  try {
    let response =  await axios.post(
      `${url}/student/fetchStudentA`,
      {
        studentId: studentId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getLecturerByUserName = async (userName, token) => {
  try {
    let response = await axios.post(
      `${url}/lecturer/adminFetchLecturerUserName`,
      {
        userName: userName,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getRecentStudentSubmissions = async (studentId, token) => {
  try {
    let response = await axios.post(
      `${url}/assignment/getRecentStudentSubmissions`,
      {
        studentId: studentId
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

let getRecentStudentSubmissionsD = async (studentId, token) => {
  try {
    let response = await axios.post(
      `${url}/dataSet/getRecentStudentSubmissions`,
      {
        studentId: studentId
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

let assignLecturer = async (
  lecturerId,
  subjectId,
  sectionId,
  programmingLanguageId,
  token
) => {
  try {
    await axios.post(
      `${url}/lecturer/assignLecturer`,
      {
        lecturerId: lecturerId,
        subjectId: subjectId,
        sectionId: sectionId,
        programmingLanguageId: programmingLanguageId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

let updateLecturer = async (lecturerId, name, email, password, token) => {
  try {
    await axios.patch(
      `${url}/lecturer/updateLecturer`,
      {
        lecturerId: lecturerId,
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

let updateLecturerStatus = async (lecturerId, status, token) => {
  try {
    await axios.patch(
      `${url}/lecturer/updateLecturerStatus`,
      {
        lecturerId: lecturerId,
        status: status,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

let recentSections = async (token) => {
  try {
    let response = await axios.post(
      `${url}/sections/getRecentSections`,
      {},
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

let lecturerAtRiskStudents = async (token) => {
  try {
    let response = await axios.post(
      `${url}/sections/getlecturerAtRiskStudents`,
      {},
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

let alllecturerAtRiskStudents = async (token) => {
  try {
    let response = await axios.post(
      `${url}/sections/getAlllecturerAtRiskStudents`,
      {},
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

let getStats = async (token) => {
  try {
    let response = await axios.post(
      `${url}/admin/getStats`,
      {},
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

let getAssignedLecturers = async (sectionId, token) => {
  try {
    let response = await axios.post(
      `${url}/sections/getAssignedLecturers`,
      {
        sectionId: sectionId,
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

let getSectionStudents = async (sectionId, token) => {
  try {
    const response = await axios.post(
      `${url}/sections/getSectionStudents`,
      {
        sectionId: sectionId,
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

let getLecturerStudents = async (lecturerId, assignId, token) => {
  try {
    const response = await axios.post(
      `${url}/student/getLecturerStudents`,
      {
        assignId: assignId,
        lecturerId: lecturerId,
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

let addSection = async (section, token) => {
  try {
    const response = await axios.post(
      `${url}/sections/addSection`,
      {
        section: section,
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

let updateSection = async (section, sectionId, token) => {
  try {
    let response = await axios.patch(
      `${url}/sections/updateSection`,
      {
        sectionId: sectionId,
        section: section,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

let removeSection = async (sectionId, token) => {
  try {
    await axios.delete(`${url}/sections/removeSection`, {
      headers: {
        Authorization: token,
      },
      data: {
        sectionId: sectionId,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getAtRiskStudents = async (token) => {
  try {
    const response = await axios.post(
      `${url}/student/getAtRiskStudents`,
      {},
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

let getStudents = async (token) => {
  try {
    const response = await axios.post(
      `${url}/student/getAll`,
      {},
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

let unAssignTeacher = async (lecturerId, assignId, token) => {
  try {
    let response = await axios.post(
      `${url}/lecturer/unAssignLecturer`,
      {
        lecturerId: lecturerId,
        assignId: assignId
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

let removeTeacher = async (lecturerId, token) => {
  try {
    await axios.delete(`${url}/lecturer/deleteL`, {
      headers: {
        Authorization: token,
      },
      data: {
        lecturerId: lecturerId,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getDataSets = async (token) => {
  try {
    const response = await axios.post(
      `${url}/dataSet/getDataSets`,
      {},
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

let getDataSet = async (datasetId, token) => {
  try {
    const response = await axios.post(
      `${url}/dataSet/getDataSet`,
      {
        datasetId: datasetId,
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

let uopdateDataSetWOF = async (data, token) => {
  try {
    const response = await axios.patch(
      `${url}/dataSet/uopdateDataSetWOF`,
      data,
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

let uopdateDataSetWF = async (data, token) => {
  try {
    const response = await axios.patch(
      `${url}/dataSet/uopdateDataSetWF`,
      data,
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

let removeDataSet = async (datasetId, token) => {
  try {
    await axios.delete(`${url}/dataSet/deleteDs`, {
      headers: {
        Authorization: token,
      },
      data: {
        datasetId: datasetId,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

let getAssignment = async (assignmentId, token) =>{
  try {
      const response = await axios.post(`${url}/assignment/getAssignmentA`,{
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

let getStudentSubmission = async (studentId,assignedId, token) =>{
  try {
      const response = await axios.post(`${url}/assignment/getStudentSubmissionA`,{
        studentId:studentId,
        assignedId:assignedId
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

let getStudentSubmission2 = async (studentId,assignedSId, token) =>{
  try {
      const response = await axios.post(`${url}/dataSet/getStudentSubmissionA`,{
        studentId:studentId,
        assignedSId:assignedSId
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
      `${url}/feedback/getFeedbacks`,{},
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
      `${url}/feedback/getFeedback`,{
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
      `${url}/feedback/giveFeedback`,{
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
      `${url}/feedback/comment`,{
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
      `${url}/feedback/comments`,{
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

export {
  getUser,
  updateEmail,
  updatePassword,
  getLecturerList,
  getLecturer,
  getAssignedSections,
  getSections,
  getSection,
  getSubjects,
  insertSubject,
  addLecturer,
  addStudent,
  getLecturerByUserName,
  assignLecturer,
  updateLecturerStatus,
  recentSections,
  lecturerAtRiskStudents,
  alllecturerAtRiskStudents,
  getStats,
  getAssignedLecturers,
  getSectionStudents,
  getLecturerStudents,
  addSection,
  updateSection,
  removeSection,
  getAtRiskStudents,
  getStudents,
  unAssignTeacher,
  removeTeacher,
  getLecturerAssignedSection,
  updateSubject,
  saveDataSet,
  getStudent,
  getDataSets,
  getDataSet,
  removeDataSet,
  uopdateDataSetWOF,
  uopdateDataSetWF,
  updateLecturer,
  getRecentStudentSubmissions,
  getRecentStudentSubmissionsD,
  getAssignment,
  getStudentSubmission,
  getStudentSubmission2,
  getfeedbacks,
  getfeedback,
  giveFeedback,
  comment,
  getComments
};
