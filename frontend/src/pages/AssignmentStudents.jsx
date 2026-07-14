import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/AssignmentStudents.css";
import "../styles/common.css";

function AssignmentStudents() {
    const {
        groupId,
        sessionId,
        assignmentId
    } = useParams();

    console.log(groupId);
    console.log(sessionId);
    console.log(assignmentId);

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, [assignmentId]);

    const fetchStudents = async () => {
        try {

            const response = await fetch(
                `http://localhost:3000/api/assignments/${assignmentId}/students`
            );
            console.log("Status:", response.status);

            const data = await response.json();
            console.log("Students:", data);

            setStudents(data);

        } catch (error) {
            console.error(error);
        }
    };

    const saveMark = async (studentId, marks) => {
        try {

            await fetch(
                `http://localhost:3000/api/assignments/${assignmentId}/student/${studentId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ marks }),
                }
            );

            fetchStudents();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="assignment-students-page">
            <span className="class-groups-eyebrow">Classroom</span>

            <h2 className="assignment-students-title">Students - {sessionId}</h2>

            <div className="assignment-students-card">
                {students.map((student) => (

                    <div key={student.id} className="student-mark-row">

                        <span className="student-mark-row__name">
                            {student.name}
                        </span>

                        <div className="student-mark-row__marks">
                            {[1, 2, 3, 4, 5].map(mark => (

                                <button
                                    key={mark}
                                    type="button"
                                    className={`student-mark-button${student.marks === mark ? " is-selected" : ""}`}
                                    onClick={() => saveMark(student.id, mark)}
                                >
                                    {mark}
                                </button>

                            ))}
                        </div>

                    </div>

                ))}
            </div>

        </div>
    );
}

export default AssignmentStudents;