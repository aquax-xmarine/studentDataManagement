import { useNavigate } from 'react-router-dom'
import SessionSquare from '../components/SessionSquare'
import './ClassGroupsScreen.css'

const classGroups = [
  {
    id: '11-calculus',
    grade: '11',
    subject: 'Calculus',
    sessionCount: 10
  },
  {
    id: '12-algebra',
    grade: '12',
    subject: 'Algebra',
    sessionCount: 1
  }
]

function ClassGroupsScreen() {
  const navigate = useNavigate()

  return (
    <div className="class-groups-screen">
      <span className="class-groups-eyebrow">Classroom</span>

      <div className="class-group-list">
        {classGroups.map((group) => (
          <section className="class-group" key={group.id}>
            <h2 className="class-group-heading">
              {group.grade} - {group.subject}
            </h2>
            <div className="session-grid">
              {Array.from({ length: group.sessionCount }, (_, i) => (
                <SessionSquare
                  key={`${group.id}-${i + 1}`}
                  label={`E${i + 1}`}
                  onClick={() => navigate(`/during-class/${group.id}/session/${i + 1}`)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ClassGroupsScreen