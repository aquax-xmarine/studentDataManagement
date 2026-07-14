import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/AssignmentStudents.css";
import "../styles/common.css";

const API_BASE = "http://localhost:3000/api";

function AssignmentStudents() {
    const { groupId, sessionId, assignmentId } = useParams();
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, [assignmentId]);

    const fetchStudents = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(
                `${API_BASE}/assignments/${assignmentId}/students`
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setStudents(data);

        } catch (error) {
            console.error("Failed to fetch students:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveMark = async (studentId, marks) => {
        // Optimistic update so the tap feels instant, corrected by the refetch below
        setStudents((prev) =>
            prev.map((s) => (s.id === studentId ? { ...s, marks } : s))
        );

        try {
            await fetch(
                `${API_BASE}/assignments/${assignmentId}/student/${studentId}`,
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
            console.error("Failed to save mark:", error);
            // Roll back on failure since the optimistic update above may be wrong
            fetchStudents();
        }
    };

    const goToStudent = (studentId) => {
        navigate(
            `/during-class/${groupId}/session/${sessionId}/assignments/${assignmentId}/student/${studentId}`
        );
    };

    return (
        <div className="assignment-students-page">
            <span className="class-groups-eyebrow">Classroom</span>

            <h2 className="assignment-students-title">Students - {sessionId}</h2>

            <div className="assignment-students-card">
                {isLoading && (
                    <p className="assignment-students-status">Loading students…</p>
                )}

                {!isLoading && students.length === 0 && (
                    <p className="assignment-students-status">No students yet.</p>
                )}

                {!isLoading && students.map((student) => (
                    <div key={student.id} className="student-mark-row">

                        <button
                            type="button"
                            className="student-mark-row__name"
                            onClick={() => goToStudent(student.id)}
                        >
                            {student.name}
                        </button>

                        <div className="student-mark-row__marks">
                            {[1, 2, 3, 4, 5].map((mark) => (
                                <button
                                    key={mark}
                                    type="button"
                                    className={`student-mark-button${student.marks === mark ? " is-selected" : ""}`}
                                    aria-pressed={student.marks === mark}
                                    aria-label={`Give ${student.name} a mark of ${mark}`}
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