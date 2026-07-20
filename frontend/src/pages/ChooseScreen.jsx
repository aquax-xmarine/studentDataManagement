import { useNavigate } from 'react-router-dom'
import OptionCard from '../components/OptionCard'
import '../styles/ChooseScreen.css'
import '../styles/common.css'

const options = [
  {
    title: 'During Class',
    subtitle: 'To add/ view specific class detail.',
    path: '/during-class',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  },
  {
    title: 'Analysis',
    subtitle: 'Overall analysis of course/ student.',
    path: '/analysis',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M18 17V9M13 17V5M8 17v-4" />
      </svg>
    )
  },
  {
    title: 'Settings',
    subtitle: 'Classroom details and other settings.',
    path: '/settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  }
]

function ChooseScreen() {
  const navigate = useNavigate()

  return (
    <div className="choose-screen-page">
      <span className="choose-eyebrow">Classroom</span>
      {/* <h1 className="choose-heading">Choose one to begin</h1> */}
      <div className="option-list">
        {options.map((opt) => (
          <OptionCard
            key={opt.title}
            title={opt.title}
            subtitle={opt.subtitle}
            icon={opt.icon}
            onClick={() => navigate(opt.path)}
          />
        ))}
      </div>
    </div>
  )
}

export default ChooseScreen