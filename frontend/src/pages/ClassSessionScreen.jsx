import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentRow from '../components/StudentRow'
import '../styles/ClassSessionScreen.css'
import '../styles/common.css'

// Replace this with real data fetched using groupId / sessionId from the URL
const mockSession = {
  taught: 7,
  remaining: 8,
  studentsToAddress: [
    { id: 's5', index: 5, name: 'Nikisha maaya', note: '<3' },
    { id: 's5b', index: 5, name: 'Nikisha maaya', note: '<3' },
    { id: 's5c', index: 5, name: 'Nikisha maaya', note: '<3' }
  ]
}

function ClassSessionScreen() {
  const [isScheduledToday, setIsScheduledToday] = useState(false);
  const [lastCompleted, setLastCompleted] = useState(null);

  const { groupId, sessionId } = useParams()
  const navigate = useNavigate()

  const [students, setStudents] = useState([])

  const [, subject] = groupId.split("-");

  useEffect(() => {

    async function checkSchedule() {
      const response = await fetch(
        `http://localhost:3000/api/class-schedule/${groupId}/${sessionId}`
      );

      const data = await response.json();

      setIsScheduledToday(data.scheduled);
    }


    async function fetchLastCompleted() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/class-remarks/last/${groupId}/${sessionId}`
        );

        const data = await response.json();

        setLastCompleted(data);

      } catch (error) {
        console.error(error);
      }
    }

    checkSchedule();
    fetchLastCompleted();

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
        {sessionId} - {subject}
      </h1>

      {/* ---- previous class ---- */}
      <section className="session-section">
        <h2 className="session-label">Class Status</h2>

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

        <button
          type="button"
          className="add-details-button"
          onClick={() =>
            navigate(`/during-class/${groupId}/session/${sessionId}/assignments`)
          }
        >
          Add Assignment Details
        </button>

      </section>

      <section className="session-section">
        <h2 className="session-label">Previous Class</h2>

        <div className="last-completed-card">
          <span className="last-completed-card__label">last completed</span>
          <span className="last-completed-card__value">
            {lastCompleted?.topics_covered || "No remarks recorded"}
          </span>
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
        <h2 className="session-label">Upcoming Class</h2>
        <div className="button-group">
          <button
            className="add-details-button"
            disabled={!isScheduledToday}
            onClick={() =>
              navigate(`/during-class/${groupId}/session/${sessionId}/remarks`)
            }
          >
            Add Details
          </button>

          {!isScheduledToday && (
            <p className="schedule-message">
              No class is scheduled today.
            </p>
          )}


        </div>
      </section>
    </div>
  )
}

export default ClassSessionScreen