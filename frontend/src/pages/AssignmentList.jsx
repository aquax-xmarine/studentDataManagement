import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/AssignmentList.css";
import "../styles/common.css";

function AssignmentList() {
    const navigate = useNavigate();
    const { groupId, sessionId } = useParams();

    console.log(groupId);
    console.log(sessionId);


    const [assignments, setAssignments] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:3000/api/assignments/${groupId}/${sessionId}`)
            .then(res => res.json())
            .then(data => setAssignments(data));


    }, [groupId, sessionId]);

    const createAssignment = async () => {

        const exercise = prompt("Enter exercise name");

        if (!exercise) return;

        const response = await fetch("http://localhost:3000/api/assignments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                exercise,
                groupId,
                section: sessionId
            })
        });

        if (response.ok) {
            const updatedAssignments = await fetch(
                `http://localhost:3000/api/assignments/${groupId}/${sessionId}`
            );

            setAssignments(await updatedAssignments.json());
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

                <button
                    className="new-assignment-button"
                    onClick={createAssignment}
                >
                    <span>New Assignment</span>

                    <div className="plus-icon">
                        +
                    </div>
                </button>
            </div>
        </div>
    );
}

export default AssignmentList;