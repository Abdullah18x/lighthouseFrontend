import logo from "./logo.svg";
import React, { Component } from "react";
import { Router, Link } from "@reach/router";

import Login from "./pages/Login.js";

import StudentHeader from "./components/StudentHeader.js";
import AdminHeader from "./components/AdminHeader.js";
import TeacherHeader from "./components/TeacherHeader.js";

import StudentDashboard from "./pages/Student/StudentDashboard.js";
import StudentChat from "./pages/Student/StudentChat.js";
import StudentMail from "./pages/Student/StudentMail.js";
import StudentAllAssignments from "./pages/Student/StudentAllAssignments.js";
import StudentViewAssignments from "./pages/Student/StudentViewAssignments.js";
import StudentProfile from "./pages/Student/StudentProfile.js";
import ViewAssignmentStd from "./pages/Student/ViewAssignment";
import ViewDataSet from "./pages/Student/ViewDataSet";
import GradedAssignments from './pages/Student/GradedAssignments'
import FeedBack3 from './pages/Student/feedback'
import ViewFeedBack3 from './pages/Student/ViewFeedback';
import IDE from "./pages/IDE.js";
import Settings3 from "./pages/Student/settings";

import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import AdminAddSections from "./pages/Admin/AdminAddSections.js";
import AdminAddTeachers from "./pages/Admin/AdminAddTeachers.js";
import AdminProfile from "./pages/Admin/AdminProfile.js";
import AdminViewSections from "./pages/Admin/AdminViewSections.js";
import AdminViewSectionDetails from "./pages/Admin/ViewSectionDetails";
import AdminViewTeachers from "./pages/Admin/AdminViewTeachers.js";
import AdminViewteacherProfile from "./pages/Admin/ViewTeacherProfile";
import AtRiskStudents from "./pages/Admin/AtRiskStudentsList";
import AssignTeacherSection from "./pages/Admin/AssignTeacherSection";
import TeachersWithARS from "./pages/Admin/TeachersWithARS";
import LecturerStudents from "./pages/Admin/LecturerStudents";
import EditSection from "./pages/Admin/EditSection";
import Subjects from "./pages/Admin/Subjects";
import AdminAddStudent from "./pages/Admin/AdminAddStudent";
import StudentProfile3 from "./pages/Admin/StudentProfile.js";
import ViewStudents from "./pages/Admin/StudentsList";
import AdminAddDataSet from "./pages/Admin/AdminAddDataSet.js";
import ViewDataSets from "./pages/Admin/AdminViewDataSets";
import AdminViewSingleDataSet from "./pages/Admin/AdminViewSIngleDataSet";
import StudentSubmissionA from "./pages/Admin/StudentSubmission";
import StudentSubmission2A from "./pages/Admin/StudentSubmission2";
import FeedBack from './pages/Admin/feedback'
import ViewFeedBack from './pages/Admin/ViewFeedback';
import Settings from "./pages/Admin/settings";

import TeacherDashboard from "./pages/Teacher/TeacherDashboard.js";
import TeacherAddAssignments from "./pages/Teacher/TeacherAddAssignments.js";
import TeacherAddStudents from "./pages/Teacher/TeacherAddStudents.js";
import TeacherAssignments from "./pages/Teacher/TeacherAssignments.js";
import TeacherProfile from "./pages/Teacher/TeacherProfile.js";
import TeacherAssignmentPreview from "./pages/Teacher/TeacherAssignmentPreview.js";
import TeacherViewStudents from "./pages/Teacher/TeacherViewStudents.js";
import TeacherSubmittedAssignments from "./pages/Teacher/TeacherSubmittedAssignments.js";
import TeacherChat from "./pages/Teacher/TeacherChat.js";
import TeacherMail from "./pages/Teacher/TeacherMail.js";
import ViewAssignment from "./pages/Teacher/ViewAssignment";
import UpdateAssignment from "./pages/Teacher/UpdateAssignment";
import TeacherAssignedAssignments from "./pages/Teacher/AssignedAssignments";
import ViewAssignedAssignment from "./pages/Teacher/ViewAssignedAssignment";
import ViewAssignedDataSet from "./pages/Teacher/ViewAssignedDataSet";
import StudentProfile2 from "./pages/Teacher/StudentProfile.js";
import StudentCallibration from "./pages/Teacher/CallibrateStundents";
import ErrorPage from "./pages/error.js";
import StudentSubmission from "./pages/Teacher/StudentSubmission";
import StudentSubmission2 from "./pages/Teacher/StudentSubmission2";
import TeacherViewSingleDataSet from "./pages/Teacher/TeacherViewDataSet";
import FeedBack2 from './pages/Teacher/feedback'
import ViewFeedBack2 from './pages/Teacher/ViewFeedback';
import Settings2 from "./pages/Teacher/settings";

import Search from "./components/Search.js";

function App() {
  return (
    <Router>
      <Login path="/" />
      <IDE path="/ide" />
      <ErrorPage path="/error/" />

      <StudentHeader path="/student/">
        <StudentDashboard path="/*" />
        <StudentChat path="/chat" />
        <StudentMail path="/mail" />
        <StudentAllAssignments path="/assignments" />
        <StudentViewAssignments path="/view-assignment" />
        <StudentProfile path="/profile" />
        <ViewAssignmentStd path="/viewAssignment" />
        <ViewDataSet path="/stdViewDataSet" />
        <GradedAssignments path='/gradedAssignment' />
        <FeedBack3 path="/feedback" />
        <ViewFeedBack3 path='/viewFeedback' />
        <Settings3 path="/settings" />
      </StudentHeader>

      <AdminHeader path="/admin/">
        <AdminDashboard path="/*" />
        <AdminAddSections path="/add-section" />
        <AdminAddTeachers path="/add-teacher" />
        <AdminProfile path="/profile" />
        <AdminViewTeachers path="/teachers" />
        <AdminViewSections path="/sections" />
        <AdminViewSectionDetails path="/sectionDetails" />
        <AtRiskStudents path="/atRiskStudents" />
        <TeachersWithARS path="/teachersWithARS" />
        <Settings path="/settings" />
        <AdminViewteacherProfile path="/teachersProfile" />
        <LecturerStudents path="/lecturerStudents" />
        <EditSection path="/editSection" />
        <AssignTeacherSection path="/assigneSection" />
        <AdminAddDataSet path="/addDataSet" />
        <ViewDataSets path="/viewDataSets" />
        <AdminViewSingleDataSet path="/dataSet" />
        <Subjects path="/subjects" />
        <AdminAddStudent path="/addStudent" />
        <StudentProfile3 path="/studentProfile" />
        <ViewStudents path="/viewStudents" />
        <StudentSubmissionA path='/studentSubmission'/>
        <StudentSubmission2A path='/studentSubmission2'/>
        <FeedBack path="/feedback" />
        <ViewFeedBack path='/viewFeedback' />
      </AdminHeader>

      <TeacherHeader path="/teacher/">
        <TeacherDashboard path="/*" />
        <TeacherAddAssignments path="/add-assignment" />
        <TeacherAddStudents path="/add-student" />
        <TeacherAssignments path="/assignments" />
        <TeacherSubmittedAssignments path="/submissions/" />
        <TeacherAssignmentPreview path="/preview/" />
        <TeacherProfile path="/profile" />
        <TeacherViewStudents path="/students" />
        <TeacherChat path="/chat" />
        <TeacherMail path="/mail" />
        <ViewAssignment path="/viewAssignment" />
        <UpdateAssignment path="/updateAssignment" />
        <TeacherAssignedAssignments path="/assignedAssignments" />
        <ViewAssignedAssignment path="/viewAssignedAssignment" />
        <StudentSubmission path="/studentSubmission" />
        <StudentSubmission2 path="/studentSubmission2" />
        <StudentProfile2 path="/studentProfile" />
        <StudentCallibration path="/studentCallibration" />
        <TeacherViewSingleDataSet path="/viewDataSet" />
        <ViewAssignedDataSet path="/viewAssignedDataSet" />
        <FeedBack2 path="/feedback" />
        <ViewFeedBack2 path='/viewFeedback' />
        <Settings2 path="/settings" />
      </TeacherHeader>
    </Router>
  );
}

export default App;
