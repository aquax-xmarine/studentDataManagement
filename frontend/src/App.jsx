console.log("APP UPDATED", Date.now());

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChooseScreen from './pages/ChooseScreen'
import DuringClass from './pages/ClassGroupScreen'
import Analysis from './pages/Analysis'
import Settings from './pages/Settings'
import ClassSessionScreen from './pages/ClassSessionScreen'
import Loginpage from './pages/Login'
import AssignmentList from './pages/AssignmentList'
import AssignmentStudents from './pages/AssignmentStudents'
import StudentRemarks from './pages/StudentRemarks'
import ClassRemarks from './pages/ClassRemarks'
import StudentClassRemarks from './pages/StudentClassRemarks'
import PreviousStudentRemarks from './pages/PreviousStudentRemarks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/choose-screen" element={<ChooseScreen />} />
        <Route path="/during-class" element={<DuringClass />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/during-class/:groupId/session/:sessionId" element={<ClassSessionScreen />} />
        <Route path="/during-class/:groupId/session/:sessionId/remarks" element={<ClassRemarks />} />
        <Route path="/during-class/:groupId/session/:sessionId/assignments" element={<AssignmentList />} />
        <Route path="/during-class/:groupId/session/:sessionId/assignments/:assignmentId" element={<AssignmentStudents />} />
        <Route path="/during-class/:groupId/session/:sessionId/assignments/:assignmentId/student/:studentId" element={<StudentRemarks />} />
        <Route path="/during-class/:groupId/session/:sessionId/student/:studentId" element={<StudentClassRemarks />} />
        <Route path="/history/:groupId/:sessionId/student/:studentId" element={<PreviousStudentRemarks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App