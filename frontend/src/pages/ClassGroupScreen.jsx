import { useNavigate } from 'react-router-dom'
import SessionSquare from '../components/SessionSquare'
import '../styles/ClassGroupsScreen.css'
import '../styles/common.css'

const classGroups = [
  {
    id: '11-Calculus',
    grade: '11',
    subject: 'Calculus',
    sessions: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10']
  },
  {
    id: '12-Algebra',
    grade: '12',
    subject: 'Algebra',
    sessions: ['M4']
  }
]

function ClassGroupsScreen() {
  const navigate = useNavigate()

  return (
    <div className="class-group-screen-page">
      <span className="choose-eyebrow">Classroom</span>

      <div className="class-group-list">
        {classGroups.map((group) => (
          <section className="class-group" key={group.id}>
            <h2 className="class-group-heading">
              {group.grade} - {group.subject}
            </h2>
            <div className="session-grid">
              {group.sessions.map((session) => (
                <SessionSquare
                  key={`${group.id}-${session}`}
                  label={session}
                  onClick={() => {
                     console.log(session);
                    navigate(`/during-class/${group.id}/session/${session}`);
                  }}
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