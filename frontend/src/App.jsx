import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChooseScreen from './pages/ChooseScreen'
import DuringClass from './pages/DuringClass'
import Analysis from './pages/Analysis'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChooseScreen />} />
        <Route path="/during-class" element={<DuringClass />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App