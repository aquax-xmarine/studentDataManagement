import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/common.css";
import "../styles/PreviousStudentRemarks.css";


function PreviousStudentRemarks() {
  const navigate = useNavigate();

  const { groupId, sessionId, studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // student details
      const studentResponse = await fetch(
        `http://localhost:3000/api/students/${studentId}`
      );

      const studentData = await studentResponse.json();
      setStudent(studentData);

      // previous class remarks
      const remarksResponse = await fetch(
        `http://localhost:3000/api/student-remarks/last/${groupId}/${sessionId}/${studentId}`
      );

      const remarksData = await remarksResponse.json();
      setRemarks(remarksData);

    } catch (err) {
      console.error(err);
    }
  }

  if (!student || !remarks) {
    return <div className="page-screen">Loading...</div>;
  }

  return (
    <div className="previous-student-remarks-page">

      <span className="choose-eyebrow">Classroom</span>

      <h1 className="student-name">{student.name}</h1>

      <div className="remarks-card">

        <label>Remarks</label>

        <textarea
          value={remarks.remarks || ""}
          readOnly
          rows={5}
        />

      </div>

      <div className="checkbox-group">

        <label>
          <input
            type="checkbox"
            checked={remarks.participating}
            disabled
          />
          Participating
        </label>

        <label>
          <input
            type="checkbox"
            checked={remarks.distracted}
            disabled
          />
          Distracted
        </label>

        <label>
          <input
            type="checkbox"
            checked={remarks.great_effort}
            disabled
          />
          Great Effort
        </label>

        <label>
          <input
            type="checkbox"
            checked={remarks.class_disturbance}
            disabled
          />
          Class Disturbance
        </label>

        <label>
          <input
            type="checkbox"
            checked={remarks.late_arrival}
            disabled
          />
          Late Arrival
        </label>

      </div>

    </div>
  );
}

export default PreviousStudentRemarks;