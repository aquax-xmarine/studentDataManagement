import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentRow from '../components/StudentRow'
import './ClassSessionScreen.css'
import '../styles/common.css'

// Replace this with real data fetched using groupId / sessionId from the URL
const mockSession = {
  code: 'E-3',
  subject: 'Calculus',
  taught: 7,
  remaining: 8,
  lastCompleted: 'Exercise 14.3 - 14 c',
  studentsToAddress: [
    { id: 's5', index: 5, name: 'Nikisha maaya', note: '<3' },
    { id: 's5b', index: 5, name: 'Nikisha maaya', note: '<3' },
    { id: 's5c', index: 5, name: 'Nikisha maaya', note: '<3' }
  ],
  students: [
    { id: 's1', name: 'Aarav Sharma', note: '' },
    { id: 's2', name: 'Bina Gurung', note: '' },
    { id: 's3', name: 'Chandra Rai', note: '' },
    { id: 's4', name: 'Diya Thapa', note: '' },
    { id: 's5', name: 'Nikisha maaya', note: '<3' }
  ]
}

function ClassSessionScreen() {
  const { groupId, sessionId } = useParams()
  const navigate = useNavigate()

  const [students, setStudents] = useState([])

  useEffect(() => {

    async function fetchStudents() {
      try {

        const response = await fetch(
          `http://localhost:3000/api/students/${groupId}/${sessionId}`
        )

        const data = await response.json()

        setStudents(data)

      } catch (error) {

        console.error(
          "Error fetching students:",
          error
        )

      }
    }


    fetchStudents()

  }, [groupId, sessionId])

  const handleSaveNote = (studentId, note) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, note } : s))
    )
  }

  console.log("Rendering ClassSessionScreen", import.meta.url);

  return (
    <div className="page-screen">
      <span className="class-groups-eyebrow">Classroom</span>


      <h1 className="class-session-heading">
        {mockSession.code} - {mockSession.subject}
      </h1>

      {/* ---- previous class ---- */}
      <section className="session-section">
        <h2 className="session-label">Previous class</h2>

        <div className="stat-card">
          <div className="stat-card__item">
            <span className="stat-card__number">{mockSession.taught}</span>
            <span className="stat-card__word">taught</span>
          </div>
          <div className="stat-card__divider" />
          <div className="stat-card__item">
            <span className="stat-card__number">{mockSession.remaining}</span>
            <span className="stat-card__word">remaining</span>
          </div>
        </div>

        <div className="last-completed-card">
          <span className="last-completed-card__label">last completed</span>
          <span className="last-completed-card__value">{mockSession.lastCompleted}</span>
        </div>

        <div className="address-card">
          <h3 className="address-card__title">Students to address</h3>
          <div className="address-card__list">
            {mockSession.studentsToAddress.map((s, i) => (
              <div className="address-pill" key={`${s.id}-${i}`}>
                {s.index}. {s.name} ( {s.note} )
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- upcoming class ---- */}
      <section className="session-section">
        <h2 className="session-label">Upcoming class</h2>
        <button
          type="button"
          className="add-details-button"
          onClick={() => navigate(`/during-class/${groupId}/session/${sessionId}/upcoming`)}
        >
          Add Details
        </button>
      </section>

      {/* ---- students ---- */}
      <section className="session-section">
        <h2 className="students-heading">Students</h2>
        <div className="student-list">
          {students.map((s, i) => (
            <StudentRow
              key={s.id}
              index={s.roll_no}
              name={s.name}
              note={s.note}
              onSaveNote={(note) => handleSaveNote(s.id, note)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ClassSessionScreen