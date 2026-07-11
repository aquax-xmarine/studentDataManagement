console.log("APP UPDATED", Date.now());

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChooseScreen from './pages/ChooseScreen'
import DuringClass from './pages/ClassGroupScreen'
import Analysis from './pages/Analysis'
import Settings from './pages/Settings'
import ClassSessionScreen from './pages/ClassSessionScreen'
import Loginpage from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChooseScreen />} />
        <Route path="/during-class" element={<DuringClass />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/during-class/:groupId/session/:sessionId" element={<ClassSessionScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App