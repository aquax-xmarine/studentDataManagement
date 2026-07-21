import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/AssignmentList.css";
import "../styles/common.css";

function AssignmentList() {
    const navigate = useNavigate();
    const { groupId, sessionId } = useParams();

    const [assignments, setAssignments] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [exerciseName, setExerciseName] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/api/assignments/${groupId}/${sessionId}`)
            .then(res => res.json())
            .then(data => setAssignments(data));
    }, [groupId, sessionId]);

    const createAssignment = async () => {
        if (!exerciseName.trim()) return;

        const response = await fetch("http://localhost:3000/api/assignments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                exercise: exerciseName,
                groupId,
                section: sessionId
            })
        });

        if (response.ok) {
            const updatedAssignments = await fetch(
                `http://localhost:3000/api/assignments/${groupId}/${sessionId}`
            );
            setAssignments(await updatedAssignments.json());
            setExerciseName("");
            setIsCreating(false);
        }
    };

    return (
        <div className="assignment-list-page">
            <span className="choose-eyebrow">Classroom</span>
            <h2 className="assignment-title">Assignments - {sessionId}</h2>

            <div className="assignment-list">
                {assignments.map((assignment, index) => (
                    <button
                        key={index}
                        className="assignment-button"
                        onClick={() =>
                            navigate(
                                `/during-class/${groupId}/session/${sessionId}/assignments/${assignment.id}`
                            )
                        }
                    >
                        {assignment.exercise}
                    </button>
                ))}

                {isCreating ? (
                    <div className="new-assignment-form">
                        <input
                            className="new-assignment-input"
                            autoFocus
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") createAssignment();
                                if (e.key === "Escape") setIsCreating(false);
                            }}
                            placeholder="Exercise name"
                        />
                        <button className="new-assignment-confirm" onClick={createAssignment}>
                            Add
                        </button>
                    </div>
                ) : (
                    <button
                        className="new-assignment-button"
                        onClick={() => setIsCreating(true)}
                    >
                        <span>New Assignment</span>
                        <div className="plus-icon">+</div>
                    </button>
                )}
            </div>
        </div>
    );
}

export default AssignmentList;